"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { NoteType } from "@/lib/db/schema";
import { Text } from "@tiptap/extension-text";
import { Loader2 } from "lucide-react";
import { useCompletion } from "ai/react";
import axios from "axios";
import TipTapMenuBar from "./TipTapMenuBar";

type Props = { note: NoteType };

function TipTapEditor({ note }: Props) {
  const defaultNotesHeading = `<h1>${note.name}</h1>`;

  const [editorState, setEditorState] = React.useState(
    note.editorState || defaultNotesHeading
  );

  const { complete, completion } = useCompletion({
    api: "/api/chatCompletion",
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNotebook", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          // Take the last 30 words that can be use to autop complete the prompt
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;

    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("Saved! ", data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {saveNote.isPending && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="prose prose-sm - w-full mt-4">
        <EditorContent editor={editor} />
      </div>

      <div className="h-4"></div>

      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-grey-800 bg-grey-100 border border-grey-200 rounded-lg">
          Shift + A
        </kbd>{" "}
        for AI autocomplete!
      </span>
    </>
  );
}

export default TipTapEditor;
