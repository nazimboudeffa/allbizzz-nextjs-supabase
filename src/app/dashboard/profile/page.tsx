import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Profile from '@/components/Profile'
import SideNav from '@/components/SideNav'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function Dashboard () {

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }


  return (
    <>
    <div className="min-h-screen flex flex-col justify-between">
    <Header session = { session } />
    <div className="grid min-h-screen md:grid-cols-[auto_1fr] justify-center gap-4 overflow-hidden p-4">
            <SideNav />
            <div className="min-h-screen w-full">
                <Profile />
            </div>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default Dashboard