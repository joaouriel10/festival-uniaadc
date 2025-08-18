import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { authClient } from '@/infra/lib/auth-client'; //import the auth client

const formSchema = z.object({
  name: z.string().min(3, {
    error: 'Nome deve ter pelo menos 3 caracteres',
  }),
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

export function useSignUpForm() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password, name }: FormSchema) => {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: '/',
        role: 'participant',
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success('Cadastro aguardando aprovação');
          router.push('/');
        },
      }
    );
  };

  return {
    form,
    onSubmit,
  };
}
