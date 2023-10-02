'use client'
import { fontHeading } from "@/lib/fonts";

function Welcome () {

  return (
    <>
    <header className="flex flex-col items-center gap-10 text-center">
      <h1
        className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
      >
        Welcome to allbiiiz
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Your business journey starts here
      </p>
    </header>
    </>
  )
}

export default Welcome