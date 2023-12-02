// /api/creteNoteBook

import { db } from "@/lib/db";
import { $note } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
    const { userId } = auth();
    if(!userId) {
        return new NextResponse('unauthorized', {status: 401})
    }
    const body = await req.json();
    const { name } = body;
    const image_description = await generateImagePrompt(name);
    if(!image_description) {
        return new NextResponse("Failed to generate Image Description", {status: 500})
    }
    const image_url = await generateImage(image_description);
    if(!image_url) {
        return new NextResponse("Failed to generate Image", {status: 500})
    }

    const note_ids = await db.insert($note).values({
        name,
        userId,
        imageUrl: image_url,
    }).returning({
        insertedId: $note.id
    })

    return NextResponse.json({
        note_id: note_ids[0].insertedId
    })
}
