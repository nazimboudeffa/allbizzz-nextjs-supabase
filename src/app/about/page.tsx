import Header from "@/components/Header"
import { fontHeading } from "@/lib/fonts"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const About = async () => {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
        <>
        <Header session = { session } />
            <div className="mt-10 flex flex-col items-center gap-10 text-center">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    About the project (from ChatGPT)
                </h1>
                <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
                Welcome to our innovative online business platform, where entrepreneurial aspirations meet limitless possibilities. Our platform is designed to empower individuals and enterprises to thrive in the digital landscape, redefining the way business is conducted.
                </p>

                <h2>Our Vision</h2>
                <p>
                    At allbizzz, we envision a world where geographical boundaries no longer limit business growth. Our platform is a conduit for turning dreams into online enterprises, connecting passionate individuals with a global audience.
                </p>

                <h2>Empowering Success</h2>
                <p>
                We believe that success in the digital age should be within everyone reach. Our user-friendly interface eliminates the complexities of online business, enabling you to focus on what you do best while we handle the technicalities.
                </p>
                <h2>
                Unleashing Creativity
                </h2>
                <p>
                Whether you're an established business looking to expand online or an individual with a unique idea, our platform provides the tools to unleash your creativity. From customizable templates to advanced e-commerce solutions, you're equipped to create a distinctive online presence.
                </p>
                <h2>
                Global Reach, Local Impact
                </h2>
                <p>
                What sets us apart is our commitment to bridging the gap between global reach and local impact. We provide you with the resources to engage with a worldwide audience while keeping your business deeply rooted in your local ethos.
                </p>
                <h2>
                Innovation at Your Fingertips
                </h2>
                <p>
                Innovation drives the digital realm, and we are at the forefront. Expect cutting-edge features that evolve with the ever-changing online landscape, ensuring your business stays ahead of the curve.
                </p>
                <h2>
                Join Our Community
                </h2>
                <p>
                When you become a part of allbizzz, you are joining a dynamic community of like-minded individuals. Share experiences, exchange ideas, and learn from others who are navigating the exciting journey of online entrepreneurship.
                </p>
                <h2>
                Your Journey, Our Support
                </h2>
                <p>
                Embarking on an online business journey can be challenging, but you're not alone. Our dedicated support team is here to assist you every step of the way, providing guidance, troubleshooting, and solutions to transform obstacles into opportunities.
                </p>
                <h2>
                Start Your Digital Success Story
                </h2>
                <p>
                Whether you are a visionary entrepreneur or a local business aiming to expand, our online business platform is your launchpad. The digital realm is full of promise, and we're here to help you turn that promise into profit. Join us today and embark on a journey of growth, innovation, and success.
                </p>
            </div>
        </>
    )
}

export default About