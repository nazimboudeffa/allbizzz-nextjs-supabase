'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import { fontHeading } from "@/lib/fonts";
import { Mail, Flag } from 'lucide-react';

import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/text-area"

type Idea = {
  id: number;
  description: string;
  user_id: string;
}

function Welcome () {

  const supabase = createClientComponentClient();
  
  const [ideas, setIdeas] = useState<Idea[] | null>([])
  const [content, setContent] = useState<string>("")
  const [sender, setSender] = useState<string | undefined>("") 

  const sendMessage = async (receiver: string) => {
    const message = {
      sender: sender,
      receiver: receiver,
      content: content
    }
    console.log(message)
    const { error } = await supabase.from('messages').insert(message)

    if (error) {         
      console.error(error)
    }
  }
  

  useEffect(() => {
    const getIdeas = async () => {
      const {
        data: ideas,
      } = await supabase.from('ideas').select()
      setIdeas(ideas)
    }

    const setSenderId = async () => {
      const { data } = await supabase.auth.getUser();
      const senderId = data.user?.id;
      setSender(senderId)
    };

    getIdeas()
    setSenderId()
    
  }, [])         

  return (
    <>
    <header className="flex flex-col items-center gap-10 text-center">
      <h1
        className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
      >
        Welcome to allbiiiz
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Your business journey starts here
      </p>
    </header>
    <section className="flex flex-col items-center gap-10 text-center">
        <div className="ml-5 mr-5 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {ideas?.map((idea) => (
          sender === idea.user_id ? null :
          <div key={idea.id} className="flex flex-col p-5 shadow rounded-[12px] dark:shadow-slate-900">
            <div className="text-xl mb-2">{idea.description}</div>
            <div className="flex flex-row justify-between">
              <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>
                          <Mail />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Write a message
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div>
                                    This message will be sent to the idea creator.
                                </div>
                                <div className="mt-2">
                                    <Textarea
                                        id="text"
                                        rows={10}
                                        className="text-md"
                                        placeholder="Enter your message..."
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction><button onClick={()=>sendMessage(idea.user_id)}>Send</button></AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              </div>
              <Button>
                <Flag />
              </Button>
            </div>
          </div>
        ))}
        </div>
    </section>
    </>
  )
}

export default Welcome