import { RatingForm } from '../forms/rating-form';

export function RatingScreen() {
  return (
    <div className="relative mx-auto max-w-6xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
          AVALIAÇÃO DE MÚSICAS
        </h1>
        <p className="text-festival-light/80 text-xl">
          Festival UNIAADC 2K25 - 8ª Edição
        </p>
      </div>
      <RatingForm />
    </div>
  );
}
