import { relations } from 'drizzle-orm';
import { json, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const regional = pgTable('regional', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const rating = pgTable('rating', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  regionalId: text('regional_id')
    .notNull()
    .references(() => regional.id, { onDelete: 'cascade' }),
  judgeId: text('judge_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  regionalMusic: json('regional_music').$defaultFn(() => {
    return JSON.stringify({
      choral_category: {
        vocal_tuning: 0,
        vocal_harmony: 0,
        technical_level: 0,
        performanceCreativity: 0,
      },
      instrumental_category: {
        music_technical_level: 0,
        arrangement_coherence: 0,
        overall_performance: 0,
      },
    });
  }),
  originalMusic: json('original_music').$defaultFn(() => {
    return JSON.stringify({
      choral_category: {
        vocal_tuning: 0,
        vocal_harmony: 0,
        technical_level: 0,
        lyric_composition_coherence: 0,
      },
      instrumental_category: {
        music_technical_level: 0,
        arrangement_coherence: 0,
        overall_performance: 0,
      },
    });
  }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const ratingRelations = relations(rating, ({ one }) => ({
  judge: one(user, {
    fields: [rating.judgeId],
    references: [user.id],
  }),
  regional: one(regional, {
    fields: [rating.regionalId],
    references: [regional.id],
  }),
}));

export const regionalRelations = relations(regional, ({ many }) => ({
  ratings: many(rating),
}));
