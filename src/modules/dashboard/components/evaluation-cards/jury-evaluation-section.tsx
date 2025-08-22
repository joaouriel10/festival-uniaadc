import type { RatingsListItem } from '@/modules/rating/actions';

type JuryEvaluationSectionProps = {
  review: RatingsListItem;
};

export function JuryEvaluationSection({ review }: JuryEvaluationSectionProps) {
  return (
    <div className="space-y-3 py-3" key={review.id}>
      <div className="border-festival-coral border-l-4 pl-4">
        <p className="font-semibold">
          Jurado: {review.judgeName}
        </p>
        <div className="mt-3 mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 font-normal text-festival-brown">
              Música Regional - Notas:
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Afinação Vocal:</span>
                <span className="font-bold text-festival-coral">
                  {review.regionalMusic.choral_category.vocal_tuning.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Harmonia Vocal:</span>
                <span className="font-bold text-festival-coral">
                  {review.regionalMusic.choral_category.vocal_harmony.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nível Técnico:</span>
                <span className="font-bold text-festival-coral">
                  {review.regionalMusic.choral_category.technical_level.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Performance:</span>
                <span className="font-bold text-festival-coral">
                  {review.regionalMusic.choral_category.performanceCreativity.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-normal text-festival-brown">
              Música Autoral - Notas:
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Afinação Vocal:</span>
                <span className="font-bold text-festival-coral">
                  {review.originalMusic.choral_category.vocal_tuning.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Harmonia Vocal:</span>
                <span className="font-bold text-festival-coral">
                  {review.originalMusic.choral_category.vocal_harmony.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nível Técnico:</span>
                <span className="font-bold text-festival-coral">
                  {review.originalMusic.choral_category.technical_level.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Coerência Letra:</span>
                <span className="font-bold text-festival-coral">
                  {review.originalMusic.choral_category.lyric_composition_coherence.toFixed(
                    1
                  )}
                  /10
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm">
          Musica Regional:{' '}
          {review.description.regionalMusic}
        </p>
        <p className="text-gray-600 text-sm">
          Musica Autoral: {review.description.originalMusic}
        </p>
      </div>
    </div>
  );
}
