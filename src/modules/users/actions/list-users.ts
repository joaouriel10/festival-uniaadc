'use server';

import { sql } from 'drizzle-orm';
import { db } from '@/infra/database';
import { user } from '@/infra/database/schemas/auth';

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: string;
  regionalName: string;
  isApproved: boolean;
  createdAt: Date;
}

export interface UserListResponse {
  users: UserListItem[];
  totalCount: number;
}

export interface GetUserListParams {
  page: number;
  pageSize?: number;
}

export async function getUserList({
  page,
  pageSize = 10,
}: GetUserListParams): Promise<UserListResponse> {
  const offset = (page - 1) * pageSize;

  const users = await db.query.user.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      emailVerified: true,
    },
    with: {
      regional: true,
    },
    limit: pageSize,
    offset,
    orderBy: (userTable, { asc }) => [asc(userTable.createdAt)],
  });

  const [totalCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(user);
  const totalCount = totalCountResult.count;

  const userList = users.map((userItem) => ({
    id: userItem.id,
    name: userItem.name,
    email: userItem.email,
    role: userItem.role,
    regionalName: userItem.regional?.name || '',
    createdAt: userItem.createdAt,
    isApproved: userItem.emailVerified,
  }));

  return {
    users: userList,
    totalCount,
  };
}
