import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import { getCurrentUser } from "@/lib/session"

async function Home () {
  
  const u = await getCurrentUser()

  return (
    <>
    <Header user = {u} />
    <Hero />
    <Footer />
    </>
  )
}

export default Home