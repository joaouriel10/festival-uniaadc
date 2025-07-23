import Image from 'next/image';
import revestidosBg from '@/core/assets/logo-revestidos-preto.webp';
import { Footer } from '@/core/components/layout/footer';
import { Header } from '@/core/components/layout/header';
import { Providers } from './providers';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="relative grid h-screen grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden bg-gradient-to-br from-festival-burgundy via-festival-brown to-festival-dark">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Image
            alt="Revestidos Background"
            className="h-full w-full max-w-4xl object-contain"
            src={revestidosBg}
          />
        </div>

        <Header />

        {children}

        <Footer />
      </div>
    </Providers>
  );
}
