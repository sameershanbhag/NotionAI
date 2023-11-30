'use client';
import React from 'react'
import axios from 'axios';
import { 
    Dialog, 
    DialogHeader, 
    DialogTitle, 
    DialogContent, 
    DialogTrigger, 
    DialogDescription } from './ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type Props = {}

const CreateNoteDialog = (props: Props) => {
  const [input, setInput] = React.useState('');

  const router = useRouter();

  const createNotebook = useMutation({
    mutationFn: async () => {
        const response = await axios.post('/api/createNoteBook', {name: input})
        return response.data;
    }
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input == "") {
        window.alert("Please enter a name for your notebook.")
        return
    }
    createNotebook.mutate(undefined, {
        onSuccess: ({note_id}) => {
            console.log("Success! Note Created with ID: " + note_id)
            router.push(`/notebook/${note_id}`)
        },
        onError: () => {
            console.error("Error! Unable to create the Note.")
            window.alert("Failed to create the Note.")
        }
    
    });
  };
  return (
    <Dialog>
        <DialogTrigger>
            <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl traasition hover:-translate-y-1 flex-row p-4">
                <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
                <h2 className="font-semibold text-green-600 small:mt-2">New Note</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    New Notebook!
                </DialogTitle>
                <DialogDescription>
                    Click the button below to create a new note.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Name..." onChange={e=>setInput(e.target.value)}/>
                <div className="h-4"></div>
                <div className="flex items-center gap-2">
                    <Button type="reset" variant={"secondary"}>
                        Cancle
                    </Button>
                    <Button type="submit" className="bg-green-600" disabled={createNotebook.isPending}>
                        {createNotebook.isPending && (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog;