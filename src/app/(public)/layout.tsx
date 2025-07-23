import Image from 'next/image';
import revestidosBg from '@/core/assets/logo-revestidos-preto.webp';
import { Footer } from '@/core/components/layout/footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-festival-burgundy via-festival-brown to-festival-dark">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Image
          alt="Revestidos Background"
          className="h-full w-full max-w-4xl object-contain"
          src={revestidosBg}
        />
      </div>

      <div className="flex flex-1 items-center justify-center">{children}</div>

      <Footer />
    </div>
  );
}
