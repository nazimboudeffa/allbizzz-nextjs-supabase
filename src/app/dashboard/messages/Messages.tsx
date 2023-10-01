'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Image from "next/image";

type Message = {
    id: number;
    receiver: string;
    sender: string;
    content: string;
    createdAt: string;
  }

function Messages() {
    const [allMessages, setAllMessages] = useState<Message[] | null>([])

    const supabase = createClientComponentClient();

    useEffect(() => {
        const getAllMessages = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const {
                data: messages,
            } = await supabase.from('messages').select().match({ receiver: user?.id } && { sender: user?.id });
            setAllMessages(messages?.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1) || [])
        }
        getAllMessages()
        
    }, [supabase])

    return (
        <>
        <main className="flex flex-1 flex-row gap-4 p-4 md:gap-8 md:p-6">
        <div className="hidden lg:block border-l bg-zinc-100/40 dark:bg-zinc-800/40">
            <div className="h-20 rounded-lg border border-zinc-200 border-dashed dark:border-zinc-800">
            <div className="p-4 flex items-center gap-4">
              <Image alt="User avatar" className="rounded-full" height="40" src="/avatar.svg" width="40" />
                <div>
                <div className="font-semibold text-zinc-800 dark:text-zinc-50">Sender Name</div>
                </div>
            </div>
            </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex-1 rounded-lg border border-zinc-200 border-dashed dark:border-zinc-800">
            <div className="p-4 flex items-start gap-4 justify-end">
              <Image alt="User avatar" className="rounded-full" height="40" src="/avatar.svg" width="40" />
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-zinc-800 dark:text-zinc-50">Sender Name</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Hello, how can I help you today?</div>
              </div>
            </div>
            <div className="p-4 flex items-start gap-4 justify-start">
              <Image alt="User avatar" className="rounded-full" height="40" src="/avatar.svg" width="40" />
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-zinc-800 dark:text-zinc-50">Receiver Name</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  I am looking for some information about your services.
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <textarea
              className="flex-1 h-10 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50 overflow-hidden resize-none"
              placeholder="Type your message here"
            />
            <Button
              className="py-2 px-4 rounded-lg text-white bg-zinc-600 dark:bg-zinc-400 hover:bg-zinc-700 dark:hover:bg-zinc-500"
              type="submit"
              variant="default"
            >
              Send
            </Button>
          </div>
        </div>
        </main>
        </>
    )
}

export { Messages }