/** biome-ignore-all lint/complexity/useSimplifiedLogicExpression: Simplified logic expression is not allowed */
import type { Session } from 'better-auth';
import { type NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders } from './infra/middleware/apply-security-headers';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const session = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    }
  );

  const body = (await session.json()) as Session;

  const isPublicRoute =
    request.nextUrl.pathname.startsWith('/sign-up') ||
    request.nextUrl.pathname === '/';

  response = await applySecurityHeaders(response);

  if (body && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!body && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

// NOTES: Aqui serão as rotas que serão protegidas pelo middleware
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|.*manifest|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
