import {
  account,
  session,
  user,
  userRelations,
  verification,
} from './schemas/auth';
import {
  rating,
  ratingRelations,
  regional,
  regionalRelations,
} from './schemas/others';

const schema = {
  user,
  userRelations,
  session,
  account,
  verification,
  regional,
  regionalRelations,
  rating,
  ratingRelations,
};

export { schema };
