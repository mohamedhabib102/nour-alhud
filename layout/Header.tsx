"use client"
import CustomContainer from "@/ui/CustomContainer"
import DarkModeToggle from "@/ui/DarkModeToggle";
import Logo from "@/ui/Logo";
import OverlayHelp from "@/ui/OverlayHelp";
import ToggleNavbar from "@/ui/ToggleNavbar";
import { useState } from "react";




const Header: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <>
        <OverlayHelp 
        toggle={toggle} 
        setToggle={setToggle} />
        <section className="bg-linear-to-r from-[#121212] to-[#ceaf15] py-2">
            <CustomContainer>
                <nav className="flex items-center justify-between">
                    <Logo />
                    <div className="flex items-center gap-4">
                    <ToggleNavbar setToggle={setToggle} toggle={toggle} />
                    <DarkModeToggle />
                    </div>
                </nav>
            </CustomContainer>
        </section>
        </>
    )
}
export default Header;