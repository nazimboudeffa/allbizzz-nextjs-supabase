import Header from "@/components/Header"
import Link from "next/link"
import { XCircle, CheckCircle2 } from 'lucide-react';
import { fontHeading } from "@/lib/fonts"

const Services = function () {

    const allServices = [
        {
            name: "Affiliation",
            description:
                "Create affiliation campaings.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            name: "Marketing",
            description:
                "Create marketing campaings.",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/",
        },
        {
            name: "Crypto",
            description:
                "Manage your cryptos.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            name: "Trading",
            description:
                "Manage your trading.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        }
    ]
    
    return (
        <>
        <Header />
        <header className="flex max-w-[980px] flex-col items-start gap-2 ml-5 mr-5 ">
            <h1
                className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
            >
                Services
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                We provide services, tools and features to help you grow your business.
            </p>
        </header>
        <div className="ml-5 mr-5 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {allServices.map((service, idx) => (
                <div
                    key={idx}
                    className="p-5 shadow rounded-[12px] dark:shadow-slate-900"
                >
                    <Link
                        href={service.link}
                        className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
                    >
                        <span className={`text-${service.color}-500 dark:text-${service.color}-700`}>
                            {service.icon}
                        </span>
                        <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                            {service.name}
                        </div>
                    </Link>
                    <p className="ml-8 mt-2 text-muted-foreground">
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
        </>
    )
}

export default Services