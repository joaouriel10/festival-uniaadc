import {
  account,
  session,
  user,
  userRelations,
  verification,
} from './schemas/auth';
import { rating, regional } from './schemas/others';

const schema = {
  user,
  userRelations,
  session,
  account,
  verification,
  regional,
  rating,
};

export { schema };
