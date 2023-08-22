import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Header from '@/components/Header'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function Home () {
  
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
    <div className="min-h-screen flex flex-col justify-between">
    <Header user = {user} />
    <Hero />
    <Footer />
    </div>
    </>
  )
}

export default Home