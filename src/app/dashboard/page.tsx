import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function Dashboard () {

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  console.log(data.session)

  if (!data?.session) {
    redirect('/');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return (
    <>
    <Header user = {user} />
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold tracking-tight">
            Your dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
            Here you will find your dashboard.
        </p>
    </div>
    <Footer />
    </>
  )
}

export default Dashboard