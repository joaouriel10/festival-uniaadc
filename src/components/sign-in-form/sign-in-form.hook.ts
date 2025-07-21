import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { authClient } from '@/lib/auth-client'; //import the auth client

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
        callbackURL: '/dashboard',
      },
      {
        onError: (ctx) => {
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
