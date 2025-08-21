import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { authClient } from '@/infra/lib/auth-client';

const formSchema = z.object({
  email: z.email({
    error: 'Email inválido',
  }),
  password: z
    .string({
      error: 'Senha inválida',
    })
    .min(8, {
      error: 'Senha deve ter pelo menos 8 caracteres',
    }),
});

type FormSchema = z.infer<typeof formSchema>;

export function useSignInForm() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: FormSchema) => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (ctx) => {
          if (ctx.error.code === 'EMAIL_NOT_VERIFIED') {
            toast.error(
              'O seu usuario não tem acesso a este sistema. Por favor, contate o administrador.',
              {
                style: {
                  background: 'var(--destructive)',
                  borderColor: 'var(--destructive)',
                  color: 'var(--background)',
                },
              }
            );
            return;
          }
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push('/dashboard');
        },
      }
    );
  };

  return {
    form,
    onSubmit,
  };
}
