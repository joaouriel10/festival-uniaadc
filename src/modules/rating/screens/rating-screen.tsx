import { redirect } from 'next/navigation';
import { getServerSession } from '@/infra/lib/get-authenticated-user';
import { RatingForm } from '../forms/rating-form';

export async function RatingScreen() {
  const { sessionFromServer } = await getServerSession();

  if (sessionFromServer?.user.role !== 'jury') {
    redirect('/dashboard');
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl p-4 pb-28">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
          AVALIAÇÃO DE MÚSICAS
        </h1>
      </div>
      <RatingForm userId={sessionFromServer?.user.id} />
    </div>
  );
}
