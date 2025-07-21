'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import logoIeadc from '@/assets/logo-assembleia-branca.webp';
import logoUniaadc from '@/assets/logo-uniaadc-colorida.webp';

export function Footer() {
  return (
    <footer>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute right-0 bottom-0 left-0 bg-black/20 px-6 py-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
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
      </motion.div>
    </footer>
  );
}
