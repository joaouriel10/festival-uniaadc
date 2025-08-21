import { Award, Medal, Trophy } from 'lucide-react';
import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent } from '@/core/components/ui/card';
import { getRatingsByRegional } from '@/modules/rating/actions';
import { EvaluationCards } from '../components/evaluation-cards';

export async function DashboardScreen() {
  const data = await getRatingsByRegional();

  return (
    <div className="relative mx-auto max-w-6xl p-4">
      <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
        DASHBOARD DE RESULTADOS
      </h1>

      <h2 className="mb-6 text-center font-bold text-2xl text-white">
        🏆 PÓDIO OFICIAL
      </h2>
      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-0 bg-gradient-to-br from-gray-300 to-gray-500 shadow-2xl">
          <CardContent className="p-6 text-center text-white">
            <div className="mb-4">
              <Medal className="mx-auto h-16 w-16 text-white" />
              <Badge className="mt-2 bg-white/20 text-white">2º Lugar</Badge>
            </div>
            {/* <h3 className="mb-2 font-bold text-lg">{resultados[1].nome}</h3>
                <p className="mb-1 font-bold text-3xl">
                  {resultados[1].pontuacaoTotal}
                </p>
                <p className="text-sm opacity-80">
                  {resultados[1].avaliacoes} avaliações
                </p> */}
          </CardContent>
        </Card>

        <div className="md:-mt-4 order-2 md:order-2">
          <Card className="border-0 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl">
            <CardContent className="p-8 text-center text-white">
              <div className="mb-4">
                <Trophy className="mx-auto h-20 w-20 text-white" />
                <Badge className="mt-2 bg-white/20 text-white">
                  🥇 CAMPEÃO
                </Badge>
              </div>
              {/* <h3 className="mb-2 font-bold text-xl">{resultados[0].nome}</h3>
                <p className="mb-1 font-bold text-4xl">
                  {resultados[0].pontuacaoTotal}
                </p>
                <p className="text-sm opacity-80">
                  {resultados[0].avaliacoes} avaliações
                </p> */}
            </CardContent>
          </Card>
        </div>

        <div className="order-3 md:order-3">
          <Card className="border-0 bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl">
            <CardContent className="p-6 text-center text-white">
              <div className="mb-4">
                <Award className="mx-auto h-16 w-16 text-white" />
                <Badge className="mt-2 bg-white/20 text-white">3º Lugar</Badge>
              </div>
              {/* <h3 className="mb-2 font-bold text-lg">{resultados[2].nome}</h3>
                <p className="mb-1 font-bold text-3xl">
                  {resultados[2].pontuacaoTotal}
                </p>
                <p className="text-sm opacity-80">
                  {resultados[2].avaliacoes} avaliações
                </p> */}
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="mb-6 text-center font-bold text-2xl text-white">
        📊 CLASSIFICAÇÃO COMPLETA
      </h2>
      <div className="grid gap-4">
        <EvaluationCards data={data} />
      </div>
    </div>
  );
}
