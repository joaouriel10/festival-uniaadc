import { Award, Medal, Trophy } from 'lucide-react';
import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent } from '@/core/components/ui/card';
import type { UnifiedRankingItem } from '@/modules/rating/dtos/rating-dto';
import { EvaluationCards } from '../components/evaluation-cards';

const executeRequest = async () => {
  try {
    const response = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/list-districts`,
      {
        next: {
          tags: ['dashboard'],
        },
      }
    );
    const data = (await response.json()) as UnifiedRankingItem[];

    return { data, isSuccess: true };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [] as UnifiedRankingItem[], isSuccess: false };
  }
};

export async function DashboardScreen() {
  const { data, isSuccess } = await executeRequest();

  return (
    <div className="relative mx-auto max-w-6xl p-40">
      <h1 className="mb-2 text-center font-bold text-4xl text-white lg:text-5xl">
        DASHBOARD DE RESULTADOS
      </h1>
      {data.length || !isSuccess ? (
        <>
          <h2 className="mb-6 text-center font-bold text-2xl text-white">
            🏆 PÓDIO OFICIAL
          </h2>

          <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 place-items-center gap-6 md:grid-cols-3">
            <Card className="h-full max-h-[95%] w-full border-0 bg-gradient-to-br from-gray-300 to-gray-500 shadow-2xl">
              <CardContent className="p-6 text-center text-white">
                <div className="mb-4">
                  <Medal className="mx-auto h-16 w-16 text-white" />
                  <Badge className="mt-2 bg-white/20 text-white">
                    2º Lugar
                  </Badge>
                </div>
                <h3 className="mb-2 font-bold text-xl">{data[1]?.name}</h3>
                <p className="mb-1 font-bold text-4xl">
                  {data[1]?.finalScore?.toFixed(1)}
                </p>
                <p className="text-sm opacity-80">
                  {data[1]?.ratingsCount} avaliações
                </p>
              </CardContent>
            </Card>

            <Card className="h-full w-full border-0 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl">
              <CardContent className="p-8 text-center text-white">
                <div className="mb-4">
                  <Trophy className="mx-auto h-20 w-20 text-white" />
                  <Badge className="mt-2 bg-white/20 text-white">
                    🥇 CAMPEÃO
                  </Badge>
                </div>
                <h3 className="mb-2 font-bold text-xl">{data[0].name}</h3>
                <p className="mb-1 font-bold text-4xl">
                  {data[0].finalScore?.toFixed(1)}
                </p>
                <p className="text-sm opacity-80">
                  {data[0].ratingsCount} avaliações
                </p>
              </CardContent>
            </Card>

            <Card className="order-3 h-full max-h-[95%] w-full border-0 bg-gradient-to-br from-yellow-900 to-yellow-800 shadow-2xl md:order-3">
              <CardContent className="p-6 text-center text-white">
                <div className="mb-4">
                  <Award className="mx-auto h-16 w-16 text-white" />
                  <Badge className="mt-2 bg-white/20 text-white">
                    3º Lugar
                  </Badge>
                </div>
                <h3 className="mb-2 font-bold text-xl">{data[2]?.name}</h3>
                <p className="mb-1 font-bold text-4xl">
                  {data[2]?.finalScore?.toFixed(1)}
                </p>
                <p className="text-sm opacity-80">
                  {data[2]?.ratingsCount} avaliações
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="mb-6 text-center font-bold text-2xl text-white">
            📊 CLASSIFICAÇÃO COMPLETA
          </h2>
          <div className="grid gap-4">
            <EvaluationCards data={data} />
          </div>
        </>
      ) : (
        <div className="text-center text-white">
          <p className="text-lg">Nenhum dado disponível no momento.</p>
        </div>
      )}
    </div>
  );
}
