import { db } from "@/lib/db";
import { $note } from "@/lib/db/schema";
import { uploadToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {noteId} = await req.json();
    //Extract Dalle URL and save to Firebase
    const notes = await db.select().from($note).where(eq($note.id, parseInt(noteId)));

    if(!notes[0].imageUrl) {
      return new NextResponse("No Image URL Found", {status: 404});
    }

    const firebaseUrl = await uploadToFirebase(notes[0].imageUrl, notes[0].name);
    await db.update($note).set({imageUrl: firebaseUrl}).where(eq($note.id, parseInt(noteId)));
    return new NextResponse("Image Uploaded to Firebase", {status: 200})
  } catch (error) {
    console.log(error)
    return new NextResponse("Error Uploading Image to Firebase", {status: 500})
  }
}