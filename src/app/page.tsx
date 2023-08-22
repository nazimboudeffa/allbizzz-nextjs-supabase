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
    <Header user = {user} />
    <Hero />
    <Footer />
    </>
  )
}

export default Home