'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import logoIeadc from '@/assets/logo-assembleia-branca.webp';
import logoUniaadc from '@/assets/logo-uniaadc-colorida.webp';

export function Footer() {
  return (
    <motion.footer
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-black/20 px-6 py-4 backdrop-blur-sm"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between lg:flex-row">
        <motion.div
          className="flex items-center gap-4"
          transition={{ type: 'spring', stiffness: 300 }}
          whileHover={{ scale: 1.05 }}
        >
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
        </motion.div>
        <div className="text-festival-light/60 text-sm">
          <p>&copy; 2025 Festival UNIAADC. Todos os direitos reservados.</p>
        </div>
      </div>
    </motion.footer>
  );
}
