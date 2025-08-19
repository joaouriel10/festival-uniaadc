'use client';

import Image from 'next/image';
import logoIeadc from '@/core/assets/logo-assembleia-branca.webp';
import logoUniaadc from '@/core/assets/logo-uniaadc-colorida.webp';

export function Footer() {
  return (
    <footer className="fade-in slide-in-from-bottom-100 fixed right-0 bottom-0 left-0 w-full animate-in border-festival-light/10 border-t bg-black/20 fill-mode-both px-6 py-4 backdrop-blur-sm delay-300 duration-300 ease-out">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-4">
          <Image
            alt="Logo IEADC"
            className="h-12 w-12 object-contain opacity-80"
            src={logoIeadc}
          />
          <Image
            alt="Logo UNIAADC"
            className="h-9 w-24 object-contain opacity-80"
            src={logoUniaadc}
          />
        </div>
        <div className="text-festival-light/60 text-sm">
          <p>&copy; 2025 Festival UNIAADC. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
