import {
  account,
  session,
  user,
  userRelations,
  verification,
} from './schemas/auth';
import {
  presentation,
  rating,
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
  presentation,
  rating,
};

export { schema };
