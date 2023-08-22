import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getCurrentSession } from "@/lib/session"

async function Home () {
  
  const s = await getCurrentSession()

  return (
    <>
    <Header session = {s} />
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

export default Home