'use client';

import { CheckCircle, Loader, Users, XCircle } from 'lucide-react';
import { useState } from 'react';
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
import { approveUser, disapproveUser } from '../../actions';
import { useUsers } from '../../queries/use-users';
import { RoleBadge } from '../role-badge/role-badge';

const pageSize = 10;

export function UserDataTable() {
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

  return (
    <Card className="h-full max-h-[550px] w-full max-w-6xl border-0 bg-white/95 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-festival-brown">
          <Users className="h-5 w-5" />
          Gerenciamento de Usuários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="h-10 w-10 animate-spin text-black" />
            </div>
          ) : (
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
                    <TableCell>
                      <RoleBadge
                        role={user.role as 'admin' | 'jury' | 'participant'}
                      />
                    </TableCell>
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
          )}
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
  );
}
