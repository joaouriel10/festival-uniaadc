/** biome-ignore-all lint/complexity/useSimplifiedLogicExpression: Simplified logic expression is not allowed */
import { type NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders } from './infra/middleware/apply-security-headers';

const adminRoutes = ['/dashboard', '/users', '/evaluations', '/districts'];
const juryRoutes = ['/rating'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const session = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    }
  );

  const body = await session.json();

  const isPublicRoute = pathname.startsWith('/sign-up') || pathname === '/';

  response = await applySecurityHeaders(response);

  const role = body?.user?.role;

  if (role === 'admin' && juryRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (role === 'jury' && adminRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/rating', request.url));
  }

  if (body && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!body && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

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
