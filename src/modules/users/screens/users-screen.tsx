'use client';

import {
  CheckCircle,
  Gavel,
  Loader,
  Shield,
  User,
  Users,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/core/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { queryClient } from '@/infra/lib/react-query';
import { useUsers } from '@/modules/users/queries/use-users';
import { approveUser, disapproveUser } from '../actions';

const pageSize = 7;

export function UsersScreen() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useUsers({ page: currentPage, pageSize });

  const totalPages = Math.ceil((data?.totalCount || 0) / pageSize);

  const handleApproveUser = async (userId: string) => {
    await approveUser(userId);
    queryClient.invalidateQueries({
      queryKey: ['users', currentPage, pageSize],
    });
  };

  const handleDisapproveUser = async (userId: string) => {
    await disapproveUser(userId);
    queryClient.invalidateQueries({
      queryKey: ['users', currentPage, pageSize],
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Shield className="mr-1 h-3 w-3" />
            Admin
          </Badge>
        );
      case 'jury':
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Gavel className="mr-1 h-3 w-3" />
            Jurado
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-200 text-black" variant="outline">
            <User className="mr-1 h-3 w-3" />
            Participante
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-white" />
      </div>
    );
  }

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Card className="h-full max-h-[550px] w-full max-w-6xl border-0 bg-white/95 shadow-xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-festival-brown">
            <Users className="h-5 w-5" />
            Gerenciamento de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            {/* <Select onValueChange={setFiltroStatus} value={filtroStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFiltroRole} value={filtroRole}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="jurado">Jurado</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={setFiltroTipoJurado}
              value={filtroTipoJurado}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="voz">Jurado de Voz</SelectItem>
                <SelectItem value="musica">Jurado de Música</SelectItem>
                <SelectItem value="null">Sem Tipo</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {!user.isApproved && (
                          <>
                            <Button
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveUser(user.id)}
                              size="sm"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDisapproveUser(user.id)}
                              size="sm"
                              variant="destructive"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="cursor-not-allowed opacity-50">
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  disabled={totalPages === currentPage}
                  onClick={handleNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </main>
  );
}
