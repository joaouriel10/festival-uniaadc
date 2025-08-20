import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { Toaster } from '@/core/components/ui/sonner';
import { Providers } from './(private)/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Festival UNIAADC',
  description: 'Festival de Música',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextHeaders = await headers();
  const nonce = nextHeaders.get('x-nonce');

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers nounce={nonce || ''}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
