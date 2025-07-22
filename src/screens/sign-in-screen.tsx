'use client';

import { motion } from 'motion/react';
import { SignInForm } from '@/components/sign-in-form';

export function SignInScreen() {
  return (
    <div className="relative z-10 grid h-full w-full max-w-6xl items-center justify-center gap-4 px-4 lg:grid-cols-2 lg:gap-8">
      <div className="space-y-8 text-center lg:text-left">
        <div className="flex flex-col gap-2">
          <motion.h1
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="font-bold font-heading text-5xl text-white leading-tight lg:text-6xl"
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.3 }}
          >
            FESTIVAL
            {/* @ts-expect-error */}
            <span className="block text-festival-coral">UNIAADC 2K25</span>
          </motion.h1>
          <motion.span
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            // @ts-expect-error
            className="font-bold font-heading text-1xl text-white leading-tight lg:text-2xl"
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            8ª Edição
          </motion.span>
          <motion.p
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="max-w-md text-festival-light/80 text-xl"
            initial={{ opacity: 0, y: 5, filter: 'blur(15px)' }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Conecte-se à maior competição musical de Curitiba em sua 8ª edição
          </motion.p>
        </div>
      </div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, type: 'spring', delay: 0.3, bounce: 0.3 }}
      >
        <SignInForm />
      </motion.div>
    </div>
  );
}
