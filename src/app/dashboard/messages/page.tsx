import Header from "@/components/Header"
import { Messages } from "./Messages"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AllMessages() {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
        <>
            <Header session = { session } />
            <div className="grid h-screen min-h-screen w-full overflow-hidden md:grid-cols-[auto_1fr]">
                <div className="hidden border-r bg-zinc-100/40 md:block dark:bg-zinc-800/40">
                    <div className="flex flex-col gap-2">
                    <div className="flex h-[60px] items-center px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                        <svg
                            className=" h-6 w-6"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                            <path d="M12 3v6" />
                        </svg>
                        <span className="">Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50"
                            href="#"
                        >
                            <svg
                            className=" h-4 w-4"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <rect height="18" rx="2" width="18" x="3" y="3" />
                            <path d="M9 14v1" />
                            <path d="M9 19v2" />
                            <path d="M9 3v2" />
                            <path d="M9 9v1" />
                            </svg>
                            General
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                            href="#"
                        >
                            <svg
                            className=" h-4 w-4"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                            </svg>
                            Messages
                            <div className="ml-auto bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 text-xs">3</div>
                        </Link>
                        </nav>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col overflow-auto">
                    <section className="sticky top-0 flex h-[60px] items-center border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
                    <Sheet>
                        <SheetTrigger asChild>
                        <Button className="-translate-x-1 md:hidden" size="icon" variant="ghost">
                            <svg
                            className=" h-5 w-5"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                            <line x1="15" x2="15" y1="3" y2="21" />
                            </svg>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[280px] px-0" side="left">
                        <div className="flex flex-col gap-2">
                            <div className="flex h-[60px] items-center px-6">
                            <Link className="flex items-center gap-2 font-semibold" href="#">
                                <svg
                                className=" h-6 w-6"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                                <path d="M12 3v6" />
                                </svg>
                                <span className="">Dashboard</span>
                            </Link>
                            </div>
                            <div className="flex-1">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <Link
                                className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50"
                                href="#"
                                >
                                <svg
                                    className=" h-4 w-4"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect height="18" rx="2" width="18" x="3" y="3" />
                                    <path d="M9 14v1" />
                                    <path d="M9 19v2" />
                                    <path d="M9 3v2" />
                                    <path d="M9 9v1" />
                                </svg>
                                General
                                </Link>
                                <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                                href="#"
                                >
                                <svg
                                    className=" h-4 w-4"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                                </svg>
                                Messages
                                <div className="ml-auto bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 text-xs">3</div>
                                </Link>
                            </nav>
                            </div>
                        </div>
                        </SheetContent>
                    </Sheet>
                </section>
                {!session ? (<div>You must be loggedin</div>) : (<Messages />)}
            </div>
        </div>
        </>
    )
}