import { $note } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        let { noteId, editorState } = body;
        
        if (!editorState || !noteId) {
            return new NextResponse('Missing required fields', { status: 400 });
        }
        
        noteId = parseInt(noteId);
        
        const notes = await db.select().from($note).where(eq($note.id, noteId));
        
        if (!notes.length) {
            return new NextResponse('Failed to update the notebook', { status: 500 });
        }

        const note = notes[0];

        if(note.editorState !== editorState) {
            await db.update($note).set({ editorState }).where(eq($note.id, noteId));
        }

        return new NextResponse('Notebook updated', { status: 200 });
    }catch(err) {
        console.error(err);
        return new NextResponse('Failed to update the notebook', { status: 500 });
    }
}