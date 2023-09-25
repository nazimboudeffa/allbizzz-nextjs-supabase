'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type Message = {
    id: number;
    receiver: string;
    sender: string;
    content: string;
  }

function Messages() {

    const [receivedMessages, setReceivedMessages] = useState<Message[] | null>([])
    const [sentMessages, setSentMessages] = useState<Message[] | null>([])

    const supabase = createClientComponentClient();
    useEffect(() => {
        const getReceivedMessages = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const {
                data: messages,
            } = await supabase.from('messages').select().match({ receiver: user?.id });
            setReceivedMessages(messages)
        }
        const getSentMessages = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const {
                data: messages,
            } = await supabase.from('messages').select().match({ sender: user?.id });
            setSentMessages(messages)
        }
        getSentMessages()
        getReceivedMessages()
    }, [supabase])

    return (
        <>
        <div className="w-full md:w-[500px] items-center">
            <h1 className="text-2xl font-bold mb-5">Your received messages</h1>
            <div className="flex flex-col">
            {receivedMessages && receivedMessages.map((message) => (
                <div key={message.id} className="flex justify-between p-5 border border-input shadow rounded-[12px] dark:border-slate-900 dark:shadow-slate-900 mb-3">
                    <div>{message.content}</div>
                </div>
            ))}
            </div>
        </div>
        <div className="w-full md:w-[500px] items-center">
            <h1 className="text-2xl font-bold mb-5">Your sent messages</h1>
            <div className="flex flex-col">
            {sentMessages && sentMessages.map((message) => (
                <div key={message.id} className="flex justify-between p-5 border border-input shadow rounded-[12px] dark:border-slate-900 dark:shadow-slate-900 mb-3">
                    <div>{message.content}</div>
                </div>
            ))}
            </div>
        </div>
        </>
    )
}

export { Messages }