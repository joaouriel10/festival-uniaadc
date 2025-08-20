'use server';

import { headers } from 'next/headers';
import { auth } from './auth';

async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return { sessionFromServer: session };
}

export { getServerSession };
