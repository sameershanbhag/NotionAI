import { pgTable, serial, timestamp, text } from 'drizzle-orm/pg-core';

export const $note = pgTable('notes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    imageUrl: text('image_url'),
    userId: text('user_id').notNull(),
    editorState: text('editor_state'),
}); 

export type NoteType = typeof $note.$inferInsert;