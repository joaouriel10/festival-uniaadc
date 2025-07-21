import Image from 'next/image';
import revestidosBg from '@/assets/logo-revestidos-preto.webp';
import { Footer } from '@/components/layout/footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-festival-burgundy via-festival-brown to-festival-dark p-4">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Image
          alt="Revestidos Background"
          className="h-full w-full max-w-4xl object-contain"
          src={revestidosBg}
        />
      </div>

      {children}

      <Footer />
    </div>
  );
}
