'use client';

import { BarChart3, LogOut, User, Users } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logoUniaadc from '@/assets/logo-uniaadc-colorida.webp';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient, useSession } from '@/lib/auth-client';

export function Header() {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="border-festival-light/10 border-b bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Image
            alt="Logo UNIAADC"
            className="h-6 w-20 object-contain"
            height={24}
            src={logoUniaadc}
            width={80}
          />
          <div className="text-white">
            <h1 className="font-bold text-lg">Festival UNIAADC 2K25</h1>
            <p className="text-festival-light/70 text-sm">8ª Edição</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            asChild
            className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
            variant="ghost"
          >
            <Link href="/users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </Button>
          <Button
            asChild
            className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
            variant="ghost"
          >
            <Link href="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
                variant="ghost"
              >
                <User className="mr-2 h-4 w-4" />
                {user?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-muted-foreground text-xs">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
