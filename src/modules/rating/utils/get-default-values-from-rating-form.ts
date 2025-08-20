import type { RatingFormData } from '../forms/rating-form/rating-form.hook';

const DEFAULT_SCORE = 5.0;
const DEFAULT_EMPTY_STRING = '';

const createDefaultChoralCategory = (initialData?: {
  vocalTuning?: number;
  vocalHarmony?: number;
  technicalLevel?: number;
  performanceCreatividade?: number;
}) => ({
  vocalTuning: initialData?.vocalTuning ?? DEFAULT_SCORE,
  vocalHarmony: initialData?.vocalHarmony ?? DEFAULT_SCORE,
  technicalLevel: initialData?.technicalLevel ?? DEFAULT_SCORE,
  performanceCreatividade:
    initialData?.performanceCreatividade ?? DEFAULT_SCORE,
});

const createDefaultInstrumentalCategory = (initialData?: {
  musicTechnicalLevel?: number;
  arrangementCoherence?: number;
  overallPerformance?: number;
}) => ({
  musicTechnicalLevel: initialData?.musicTechnicalLevel ?? DEFAULT_SCORE,
  arrangementCoherence: initialData?.arrangementCoherence ?? DEFAULT_SCORE,
  overallPerformance: initialData?.overallPerformance ?? DEFAULT_SCORE,
});

const createDefaultMusicCategory = (initialData?: {
  choralCategory?: Parameters<typeof createDefaultChoralCategory>[0];
  instrumental?: Parameters<typeof createDefaultInstrumentalCategory>[0];
  observations?: string;
}) => ({
  choralCategory: createDefaultChoralCategory(initialData?.choralCategory),
  instrumental: createDefaultInstrumentalCategory(initialData?.instrumental),
  observations: initialData?.observations ?? DEFAULT_EMPTY_STRING,
});

/**
 * Creates default values for the rating form with optional initial data
 * @param initialData - Partial rating form data to merge with defaults
 * @returns Complete rating form data with defaults applied
 */
const getDefaultValues = (
  initialData?: Partial<RatingFormData>
): RatingFormData => ({
  regional: initialData?.regional ?? DEFAULT_EMPTY_STRING,
  regionalMusic: createDefaultMusicCategory(initialData?.regionalMusic),
  originalMusic: createDefaultMusicCategory(initialData?.originalMusic),
});

export { getDefaultValues };
