import Header from "@/components/Header"
import { fontHeading } from "@/lib/fonts"

const About = () => {
    return (
        <>
        <Header />
            <div className="mt-10 flex flex-col items-center gap-10 text-center">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    About.
                </h1>
                <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, voluptatibus. Magni, sit! Quia, repellat? Iure voluptatum pariatur dolor obcaecati ut, enim reprehenderit perferendis id soluta debitis? In totam architecto repudiandae.
                </p>
            </div>
        </>
    )
}

export default About