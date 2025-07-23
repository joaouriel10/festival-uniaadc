'use client';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { useSignInForm } from './sign-in-form.hook';

export function SignInForm() {
  const { form, onSubmit } = useSignInForm();

  const { isSubmitting } = form.formState;

  return (
    <Card className="border-0 bg-white/95 shadow-2xl backdrop-blur-sm">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="font-bold text-2xl text-festival-brown">
          Login
        </CardTitle>
        <CardDescription className="text-festival-brown/70">
          Entre com seu email e senha para acessar sua conta
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-festival-brown">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-festival-brown/20 focus:border-festival-coral focus:ring-festival-coral"
                      placeholder="uniaadc@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-festival-brown">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-festival-brown/20 focus:border-festival-coral focus:ring-festival-coral"
                      placeholder="********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-4 flex-col gap-2">
            <Button
              className="w-full transform cursor-pointer bg-festival-coral py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-festival-orange"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Loader className="animate-spin" /> : 'Entrar'}
            </Button>
            <div className="border-festival-brown/10 border-t pt-2">
              <p className="text-festival-brown/70 text-sm">
                Quer se cadastrar como jurado?{' '}
                <Link
                  className="font-medium text-festival-coral transition-colors hover:text-festival-orange"
                  href="/sign-up"
                >
                  Cadastrar
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
