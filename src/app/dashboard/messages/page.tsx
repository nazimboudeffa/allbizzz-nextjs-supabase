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
            <div className="grid h-[calc(100vh-70px)] md:grid-cols-[auto_1fr] justify-center gap-4 overflow-hidden p-4">
            <SideNav />
            <div className="h-full w-full">
                  {!session ? (<div>You must be loggedin</div>) : (<Messages />)}
            </div>
            </div>

        </>
    )
}