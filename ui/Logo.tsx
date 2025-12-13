"use client"
import Image from "next/image"
import Link from "next/link";


const Logo: React.FC = () => {
    return (
      <Link href="/">
        <h1 className="flex items-center gap-1.5" dir="ltr">
       <Image
        src="/logo.svg"
        alt="image logo"
        title=" نور الهدى "
        width={50}
        height={100}
        className="w-18 h-20"
      />

        <span className="text-(--main-color) font-semibold text-2xl"> نور الهدى 
        </span>
    </h1>
      </Link>
    )
}
export default Logo;