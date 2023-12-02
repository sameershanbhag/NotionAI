import { db } from "@/lib/db";
import { $note } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import React from "react";
import Link from "next/link";
import TipTapEditor from "@/components/TipTapEditor";
import DeleteButton from "@/components/deleteButton";

type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  const user = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($note)
    .where(and(eq($note.id, parseInt(noteId)), eq($note.userId, userId)));

  if (notes.length != 1) {
    return redirect("/dashboard");
  }

  const note = notes[0];

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4x1 mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {" "}
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1"> / </span>
          <span className="font-semibold text-stone-500"> {note.name} </span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
