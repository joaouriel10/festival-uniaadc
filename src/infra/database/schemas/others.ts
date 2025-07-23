import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const regional = pgTable('regional', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const regionalRelations = relations(regional, ({ many }) => ({
  presentations: many(presentation),
}));

export const presentation = pgTable('presentation', {
  id: text('id').primaryKey(),
  regionalId: text('regional_id')
    .notNull()
    .references(() => regional.id, { onDelete: 'cascade' }),
});

export const rating = pgTable('rating', {
  id: text('id').primaryKey(),
  presentationId: text('presentation_id')
    .notNull()
    .references(() => presentation.id, { onDelete: 'cascade' }),
  juryId: text('jury_id').notNull(),
  score: integer('score'),
  comment: text('comment'),
  // adicionar os dem
});
