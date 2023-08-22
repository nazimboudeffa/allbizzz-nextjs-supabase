import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function Welcome () {

  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
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
    <Header user = { user } />
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to ALLBIZZZ
        </h1>
        <p className="text-sm text-muted-foreground">
            You can go to your dashboard.
        </p>
    </div>
    <Footer />
    </>
  )
}

export default Welcome