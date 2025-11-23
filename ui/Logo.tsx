"use client"
import Image from "next/image"


const Logo: React.FC = () => {
    return (
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
    )
}
export default Logo;