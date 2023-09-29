'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

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
        <div>This is not a chat, chat is not available at the moment and is a premium service</div>
        <div className="h-full w-full flex flex-row shadow rounded-sm">
            <div className="h-16">
                <div className="flex items-center justify-between h-full px-6 border-b-2">
                    <div className="flex items-center">
                        <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">Sender1</div>
                    </div>
                </div>
                <div className="flex items-center justify-between h-full px-6 border-b-2">
                    <div className="flex items-center">
                        <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">Sender2</div>
                    </div>
                </div>
                <div className="flex items-center justify-between h-full px-6 border-b-2">
                    <div className="flex items-center">
                        <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">Sender3</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between w-full border-l-2">
                <div className="flex flex-col">
                    {allMessages && allMessages.map((message) => (
                        <div key={message.id} className="flex justify-between p-5 border border-input shadow rounded-[12px] dark:border-slate-900 dark:shadow-slate-900 m-3">
                            <div className="rounded bg-sky-600">Sender</div>
                            <div>{message.content}</div>
                        </div>
                    ))}
                </div>
                <form className="bg-gray-100 flex items-center px-6 py-4 font-sans font-semibold">
                    <input
                        className="flex-grow mr-2 h-full border rounded placeholder-gray-500 font-semibold p-4 bg-gray-300 focus:bg-white focus:outline-none"
                        placeholder="Type your message.." name="message" type="text" aria-label="Message input box"/>
                    <button className="block w-32 h-full bg-blue-600 text-white py-2 px-4 font-semibold rounded"
                            type="submit" style={{backgroundColor: "#1d6ed7"}}>
                        Send
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export { Messages }