'use client';

import { motion } from 'motion/react';
import { SignUpForm } from '../forms/sign-up-form';

export function SignUpScreen() {
  return (
    <div className="relative z-10 grid w-full max-w-6xl flex-1 items-center gap-10 px-4 lg:grid-cols-2">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3, type: 'spring', delay: 0.3, bounce: 0.3 }}
      >
        <SignUpForm />
      </motion.div>

      {/* Left Side - Branding */}
      <div className="space-y-8 text-center lg:text-left">
        <div className="flex flex-col gap-2">
          <motion.h1
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="font-bold font-heading text-5xl text-white leading-tight lg:text-6xl"
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.3 }}
          >
            FESTIVAL
            <span className="block text-festival-coral">UNIAADC 2K25</span>
          </motion.h1>
          <motion.span
            animate={{ opacity: 1, filter: 'blur(0px)' }}
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
            Faça parte da equipe de jurados do maior festival musical de
            Curitiba
          </motion.p>
        </div>
      </div>
    </div>
  );
}
