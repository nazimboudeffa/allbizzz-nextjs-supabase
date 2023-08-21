import Link from "next/link"

export default function MobileMenu ({ open } : { open: boolean }) {
    return (
        <div className={`${open? "block" : "hidden"} flex flex-col`}>
            <Link href="/services">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Services
                </span>
            </Link>
            <Link href="/">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Blog
                </span>
            </Link>
        </div>
    )
}