import { MapPin } from 'lucide-react';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { getServerSession } from '@/infra/lib/get-authenticated-user';
import { CreateDistrictButton } from '../components/create-district-button';
import { DistrictsTable } from '../components/districts-table';

export async function DistrictsScreen() {
  const { sessionFromServer } = await getServerSession();

  if (sessionFromServer?.user.role !== 'admin') {
    redirect('/rating');
  }

  return (
    <div className="relative z-10 mx-auto max-w-7xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
          GERENCIAMENTO DE REGIONAIS
        </h1>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl p-4">
        <Card className="h-full max-h-[550px] w-full max-w-6xl border-0 bg-white/95 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-festival-brown">
                  <MapPin className="h-5 w-5" />
                  Regionais Cadastradas
                </CardTitle>
                <CardDescription>
                  Lista de todas as regionais do festival
                </CardDescription>
              </div>
              <CreateDistrictButton />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <DistrictsTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
