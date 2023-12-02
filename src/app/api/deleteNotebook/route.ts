import { db } from "@/lib/db";
import { $note } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {noteId} = await req.json();
    await db.delete($note).where(eq($note.id, parseInt(noteId)));
    return new NextResponse("Notebook Deleted", {status: 200})
}