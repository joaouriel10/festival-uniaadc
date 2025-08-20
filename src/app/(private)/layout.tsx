import { Footer } from '@/core/components/layout/footer';
import { Header } from '@/core/components/layout/header';
import { cn } from '@/core/lib/utils';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn([
        'relative grid h-screen grid-cols-1 grid-rows-[auto_1fr_auto] overflow-x-hidden',
        'before:absolute before:inset-0 before:bg-[url(/logo-revestidos-preto.webp)] before:bg-center before:bg-contain before:bg-no-repeat before:opacity-15',
      ])}
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, var(--festival-burgundy), var(--festival-brown), var(--festival-dark))',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Header />

      {children}

      <Footer />
    </div>
  );
}
