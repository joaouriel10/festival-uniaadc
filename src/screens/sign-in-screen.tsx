'use client';

import { motion } from 'motion/react';
import { SignInForm } from '@/components/sign-in-form';

export function SignInScreen() {
  return (
    <div className="relative z-10 grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 text-center lg:text-left"
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            animate={{ opacity: 1, scale: 1 }}
            className="font-bold font-heading text-5xl text-white leading-tight lg:text-6xl"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            FESTIVAL
            <span className="block text-festival-coral">UNIAADC 2K25</span>
            <span className="mt-2 block font-normal text-2xl text-festival-light/90 lg:text-3xl">
              8ª Edição
            </span>
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md text-festival-light/80 text-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Conecte-se à maior competição musical de Curitiba em sua 8ª edição
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        <SignInForm />
      </motion.div>
    </div>
  );
}
