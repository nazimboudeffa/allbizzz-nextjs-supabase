'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import { fontHeading } from "@/lib/fonts";

type Idea = {
  id: number;
  description: string;
}

function Welcome () {

  const supabase = createClientComponentClient();
  
  const [ideas, setIdeas] = useState<Idea[] | null>([])

  useEffect(() => {
    const getIdeas = async () => {
      const {
        data: ideas,
      } = await supabase.from('ideas').select()

      console.log(ideas)

      setIdeas(ideas)
    }
    getIdeas()
  }, [])         

  return (
    <>
    <header className="mt-10 flex flex-col items-center gap-10 text-center">
      <h1
        className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
      >
        Welcome to allbizz.
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Everything starts here.
      </p>
    </header>
    <section className="flex flex-col items-center gap-10 text-center">
        <div className="ml-5 mr-5 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {ideas?.map((idea) => (
          <div key={idea.id} className="p-5 shadow rounded-[12px] dark:shadow-slate-900">{idea.description}</div>
        ))}
        </div>
    </section>
    </>
  )
}

export default Welcome