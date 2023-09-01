import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Welcome from '@/components/Welcome'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { useRouter } from 'next/navigation'

async function Home () {
  
  router = useRouter();

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  router.refresh()

  if (session) {
    return (
      <>
      <div className="min-h-screen flex flex-col justify-between">
      <Header session = { session } />
      <Welcome />
      <Footer />
      </div>
      </>
    )
  } else {
    return (
      <>
      <div className="min-h-screen flex flex-col justify-between">
      <Header session = { session } />
      <Hero />
      <Footer />
      </div>
      </>
    )
  }
}

export default Home