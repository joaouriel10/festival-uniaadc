import { redirect } from 'next/navigation';
import { getServerSession } from '@/infra/lib/get-authenticated-user';
import { UserDataTable } from '../components/user-datatable';

export async function UsersScreen() {
  const { sessionFromServer } = await getServerSession();

  if (sessionFromServer?.user.role !== 'admin') {
    redirect('/rating');
  }

  return (
    <div className="relative mx-auto max-w-7xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
          GERENCIAMENTO DE USUÁRIOS
        </h1>
      </div>
      <div className="relative mx-auto max-w-6xl p-4">
        <UserDataTable />
      </div>
    </div>
  );
}
