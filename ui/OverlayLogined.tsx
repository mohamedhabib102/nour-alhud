"use client"
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef } from "react";







const OverlayLogined = (
    {
    toggleLogined, 
    setToggleLogined}: 
    {
    toggleLogined: boolean, 
    setToggleLogined: (toggleLogined: boolean) => void
    }) => {

            const ref = useRef<HTMLDivElement>(null)
        
            useEffect(() => {
                const handleClickOutside = (event: MouseEvent) => {
                    if (ref.current && !ref.current.contains(event.target as Node)) {
                        setToggleLogined(false);
                    }
                };
                document.addEventListener("mousedown", handleClickOutside);
                return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            }, [ref]);

    return (
        <div ref={ref} className={`
        absolute top-24 right-32 w-36  text-right
        ${toggleLogined ? "opacity-100 visible" : "opacity-0 invisible"}
        transition duration-200 z-20 bg-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]
        `}>
            <ul className="flex flex-col">
                <Link href="/profile"  className="cursor-pointer  transition hover:bg-gray-200/65 dark:hover:bg-gray-600 py-2.5 px-2 text-sm last:mb-0 text-(--main-color) dark:text-gray-50 border-b border-gray-200
                dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 flex items-center justify-end gap-1"> 
                <span> الحساب </span>
                <RiAccountPinCircleFill size={20}/>
                 </Link>
                <Link href="/favorite" className="cursor-pointer transition hover:bg-gray-200/65 dark:hover:bg-gray-600 py-2.5 px-2 text-sm last:mb-0 text-(--main-color) dark:text-gray-50 border-b border-gray-200
                dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 flex items-center justify-end gap-1"> 
                <span>الآيات المفضله</span>
                <FaClipboardList size={20}/>
                </Link>
                <Link href="/saved" className="cursor-pointer transition hover:bg-gray-200/65 dark:hover:bg-gray-600 py-2.5 px-2 text-sm last:mb-0 text-(--main-color) dark:text-gray-50 border-b border-gray-200
                dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 flex items-center justify-end gap-1"> 
                <span>الآيات المحفوظه</span>
                <FaBookmark size={20}/>
                </Link>
            </ul>
        </div>
    )
}
export default OverlayLogined