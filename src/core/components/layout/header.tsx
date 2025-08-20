'use client';

import {
  BarChart3,
  LinkIcon,
  LogOut,
  MapPin,
  Menu,
  Stars,
  User,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logoUniaadc from '@/core/assets/logo-uniaadc-colorida.webp';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { cn } from '@/core/lib/utils';
import { authClient, useSession } from '@/infra/lib/auth-client';

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn([
          'relative z-10 border-festival-light/10 border-b bg-black/20 backdrop-blur-sm',
          'slide-in-from-top-100 fade-in animate-in fill-mode-both delay-150 duration-500 ease-out',
        ])}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              alt="Logo UNIAADC"
              className="h-5 w-16 object-contain sm:h-6 sm:w-20"
              height={24}
              src={logoUniaadc || '/placeholder.svg'}
              width={80}
            />
            <div className="hidden text-white sm:block">
              <h1 className="font-bold text-base sm:text-lg">
                Festival UNIAADC 2K25
              </h1>
              <p className="text-festival-light/70 text-xs sm:text-sm">
                8ª Edição
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {user?.role === 'admin' && (
              <>
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
                <Button
                  asChild
                  className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
                  variant="ghost"
                >
                  <Link href="/users">
                    <Users className="mr-2 h-4 w-4" />
                    Usuários
                  </Link>
                </Button>
                <Button
                  asChild
                  className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
                  variant="ghost"
                >
                  <Link href="/districts">
                    <MapPin className="mr-2 h-4 w-4" />
                    Regionais
                  </Link>
                </Button>
                <Button
                  asChild
                  className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
                  variant="ghost"
                >
                  <Link href="/evaluations">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Avaliação
                  </Link>
                </Button>
              </>
            )}
            {user?.role === 'jury' && (
              <Button
                asChild
                className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
                variant="ghost"
              >
                <Link href="/rating">
                  <Stars className="mr-2 h-4 w-4" />
                  Avaliações
                </Link>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="cursor-pointer text-white hover:bg-festival-coral/20 hover:text-white"
                  variant="ghost"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span className="hidden lg:inline">{user?.name}</span>
                  <span className="lg:hidden">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <div className="px-2 py-1.5">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-muted-foreground text-xs">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <Button
              className="p-2 text-white hover:bg-festival-coral/20"
              onClick={toggleMobileMenu}
              size="sm"
              variant="ghost"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            animate={{ transform: 'translateY(0)' }}
            className="fixed top-0 right-0 z-50 bg-black/80 p-6 backdrop-blur-md md:hidden"
            exit={{ transform: 'translateY(-470px)' }}
            initial={{ transform: 'translateY(-470px)' }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          >
            <div className="h-full w-full">
              <div className="mb-8 flex items-center justify-between">
                <div className="text-white">
                  <h2 className="font-bold text-lg">Festival UNIAADC</h2>
                  <p className="text-festival-light/70 text-sm">8ª Edição</p>
                </div>
                <Button
                  className="p-2 text-white hover:bg-festival-coral"
                  onClick={closeMobileMenu}
                  size="sm"
                  variant="ghost"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {user && (
                <div className="mb-6 rounded-lg bg-black/90 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-festival-coral">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-white">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-festival-light/70 text-xs">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <nav className="space-y-3">
                {user?.role === 'admin' ? (
                  <>
                    <Link href="/dashboard" onClick={closeMobileMenu}>
                      <Button
                        className="h-12 w-full justify-start text-white hover:bg-festival-coral/20 hover:text-white"
                        variant="ghost"
                      >
                        <BarChart3 className="mr-3 h-5 w-5" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/users" onClick={closeMobileMenu}>
                      <Button
                        className="h-12 w-full justify-start text-white hover:bg-festival-coral/20 hover:text-white"
                        variant="ghost"
                      >
                        <Users className="mr-3 h-5 w-5" />
                        Gerenciar Usuários
                      </Button>
                    </Link>
                    <Link href="/districts" onClick={closeMobileMenu}>
                      <Button
                        className="h-12 w-full justify-start text-white hover:bg-festival-coral/20 hover:text-white"
                        variant="ghost"
                      >
                        <MapPin className="mr-3 h-5 w-5" />
                        Regionais
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/dashboard" onClick={closeMobileMenu}>
                    <Button
                      className="h-12 w-full justify-start text-white hover:bg-festival-coral/20 hover:text-white"
                      variant="ghost"
                    >
                      <Stars className="mr-3 h-5 w-5" />
                      Avaliações
                    </Button>
                  </Link>
                )}
                <div className="mt-6 border-festival-light/20 border-t pt-3">
                  <Button
                    className="h-12 w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-white"
                    onClick={handleLogout}
                    variant="ghost"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sair
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
