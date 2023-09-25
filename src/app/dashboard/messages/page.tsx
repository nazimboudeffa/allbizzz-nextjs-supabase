import Header from "@/components/Header"
import { Messages } from "./Messages"
import { fontHeading } from "@/lib/fonts"
import SideNav from "@/components/SideNav"

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
            <div className="grid min-h-screen md:grid-cols-[auto_1fr] justify-center gap-4 overflow-hidden p-4">
            <SideNav />
            <div className="min-h-screen w-full">
              <header className="mt-10 flex flex-col items-center gap-10 text-center">
              <div className="flex max-w-[980px] flex-col gap-2">
                  <h1
                      className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                  >
                      Your messages
                  </h1>
                  <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                      Here you can find your messages.
                  </p>
              </div>
              </header>
              <section className="flex flex-col gap-10 mt-10 items-center">
                  {!session ? (<div>You must be loggedin</div>) : (<Messages />)}
              </section>
            </div>
            </div>

        </>
    )
}