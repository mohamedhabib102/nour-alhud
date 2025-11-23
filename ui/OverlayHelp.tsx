import { IconType } from "react-icons";
import { MdOutlineHomeMax } from "react-icons/md";
import { FaMosque, FaHandHoldingHeart } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";


interface OverlayMessage {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Navbar {
    id: number;
    title: string;
    link: string;
    icon: IconType;
}

const NavbarText: Navbar[] = [
    {
        id: 1,
        title: "الرئيسية",
        link: "/",
        icon: MdOutlineHomeMax
    },
    {
        id: 2,
        title: " المجتمع ",
        link: "/community",
        icon: FaMosque
    },
    {
        id: 3,
        title: " مساعدة او اي استفسار",
        link: "/",
        icon: IoIosHelpCircleOutline
    },
    {
        id: 4,
        title: " دعمنا ",
        link: "/",
        icon: FaHandHoldingHeart
    }
]


const OverlayHelp: React.FC<OverlayMessage> = ({ toggle, setToggle }) => {
    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-10 bg-black/50`}></div>
            <div className={`${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-300 fixed top-1/2 left-1/2 -translate-1/2 z-20 lg:w-96 w-10/12 m-auto bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-lg`}>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-(--main-color) dark:text-gray-200 absolute top-2 right-2">
                    <MdClose size={30} />
                </button>
                <ul className="text-right flex justify-end flex-col gap-3 mt-7">
                    {NavbarText.map((nav) => (
                        <li key={nav.id} className="">
                            <Link href={nav.link}
                                className="flex items-center gap-2 justify-start flex-row-reverse
                    p-2 bg-[#0e582dd6] rounded-lg hover:bg-[#0e582d] text-white cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            >
                                <nav.icon size={20} />
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    ))}
                    <p className="flex items-center flex-row-reverse justify-center mt-2 text-center gap-1 font-semibold text-gray-800 dark:text-gray-200">
                        "
                        <span>  وجودك يعني لنا الكثير </span>
                        <FaHeart size={20} className="text-red-500" />
                        "
                    </p>
                </ul>
            </div>
        </>
    )
}
export default OverlayHelp;