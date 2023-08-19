import Header from "@/components/Header"
import Link from "next/link"

const Services = function () {
    return (
        <>
        <Header />
        <div className="flex flex-col items-center mt-10">
                <div className="underline"><Link href="/jobs">Jobs</Link></div>
                <div>Affiliation</div>
                <div>Trading</div>
                <div>Cryptos</div>
        </div>
        </>
    )
}

export default Services