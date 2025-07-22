import Image from 'next/image';
import revestidosBg from '@/assets/logo-revestidos-preto.webp';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
