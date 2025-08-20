'use client';

import { Award, Medal, Trophy } from 'lucide-react';
import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent } from '@/core/components/ui/card';

export function DashboardScreen() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl p-4">
      <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
        DASHBOARD DE RESULTADOS
      </h1>

      <h2 className="mb-6 text-center font-bold text-2xl text-white">
        🏆 PÓDIO OFICIAL
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
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
        {/* {resultados.map((resultado, index) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              key={resultado.id}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-full bg-gradient-to-br ${getPosicaoColor(resultado.posicao)} flex items-center justify-center`}
                      >
                        {getPosicaoIcon(resultado.posicao)}
                      </div>
                      <div>
                        <h3 className="font-bold text-festival-brown text-lg">
                          {resultado.nome}
                        </h3>
                        <p className="text-festival-brown/70 text-sm">
                          {resultado.avaliacoes} avaliações realizadas
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-3xl text-festival-coral">
                        {resultado.pontuacaoTotal}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge className="text-xs" variant="outline">
                          M1: {resultado.pontuacaoMusica1}
                        </Badge>
                        <Badge className="text-xs" variant="outline">
                          M2: {resultado.pontuacaoMusica2}
                        </Badge>
                        <div className="ml-2 flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="bg-transparent"
                                size="sm"
                                variant="outline"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Revisão de Avaliações - {resultado.nome}
                                </DialogTitle>
                                <DialogDescription>
                                  Detalhes das avaliações realizadas para esta
                                  regional
                                </DialogDescription>
                              </DialogHeader>
                              <div className="max-h-96 space-y-4 overflow-y-auto">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">
                                        Música 1
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span>Afinação Vocal:</span>
                                          <span className="font-bold">
                                            8.5/10
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Harmonia Vocal:</span>
                                          <span className="font-bold">
                                            9.0/10
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Nível Técnico:</span>
                                          <span className="font-bold">
                                            8.2/10
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Performance:</span>
                                          <span className="font-bold">
                                            9.5/10
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">
                                        Música 2
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span>Afinação Vocal:</span>
                                          <span className="font-bold">
                                            8.8/10
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Harmonia Vocal:</span>
                                          <span className="font-bold">
                                            8.7/10
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Nível Técnico:</span>
                                          <span className="font-bold">
                                            8.0/10
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Coerência Letra:</span>
                                          <span className="font-bold">
                                            9.2/10
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      Observações dos Jurados
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      <div className="border-festival-coral border-l-4 pl-4">
                                        <p className="font-semibold">
                                          Jurado: Maria Santos
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                          Excelente performance vocal, harmonia
                                          bem trabalhada. Sugestão: trabalhar
                                          mais os ataques instrumentais.
                                        </p>
                                      </div>
                                      <div className="border-festival-coral border-l-4 pl-4">
                                        <p className="font-semibold">
                                          Jurado: Carlos Ferreira
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                          Boa técnica vocal, arranjo coerente.
                                          Destaque para a criatividade na
                                          segunda música.
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            className="border-festival-coral bg-festival-coral/10 text-festival-coral hover:bg-festival-coral/20"
                            disabled={revisaoSolicitada === resultado.id}
                            onClick={() =>
                              handleSolicitarRevisao(
                                resultado.id,
                                resultado.nome
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            {revisaoSolicitada === resultado.id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-festival-coral border-t-transparent" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))} */}
      </div>
    </div>
  );
}
