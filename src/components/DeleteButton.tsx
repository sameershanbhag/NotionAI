"use client";
import { Trash } from "lucide-react";
import React, { use } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  noteId: number;
};

const deleteButton = ({ noteId }: Props) => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNotebook", {
        noteId,
      });
      return response.data;
    },
  });
  return (
    <Button
      variant={"destructive"}
      size="sm"
      disabled={deleteNote.isPending}
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to delete this note?"
        );
        if (!confirm) return;
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            router.push("/");
          },
          onError: () => {
            console.error("Error! Unable to delete the Note.");
          },
        });
      }}
    >
      <Trash />
    </Button>
  );
};

export default deleteButton;
