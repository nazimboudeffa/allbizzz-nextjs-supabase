import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <div className="container flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold tracking-tight">
            Your dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
            Here you will find your dashboard.
        </p>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default Dashboard