"use client"
import { MdClose } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { useEffect, useState } from "react";

interface SavedSurhaProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAyah: any;
    onUpdate?: () => void;
}

const SavedSurha: React.FC<SavedSurhaProps> = ({ isOpen, onClose, selectedAyah, onUpdate }) => {
    const [isExist, setIsExist] = useState(false);
    const [isMarked, setIsMarked] = useState(false);

    const handleAayaToFavorite = () => {
        const ayas = JSON.parse(localStorage.getItem("ayas") || "[]");
        const isExistInStorage = ayas.find((aya: any) => aya.number === selectedAyah.number);
        if (isExistInStorage) {
            const newAyas = ayas.filter((aya: any) => aya.number !== selectedAyah.number);
            localStorage.setItem("ayas", JSON.stringify(newAyas));
            setIsExist(false);
        } else {
            localStorage.setItem("ayas", JSON.stringify([...ayas, selectedAyah]));
            setIsExist(true);
        }
    }

    const handleMarkClick = () => {
        const marks = JSON.parse(localStorage.getItem("marks") || "[]");
        const isMarkedInStorage = marks.find((mark: any) => mark?.number === selectedAyah.number);

        if (isMarkedInStorage) {
            const newMarks = marks.filter((mark: any) => mark?.number !== selectedAyah.number);
            localStorage.setItem("marks", JSON.stringify(newMarks));
            setIsMarked(false);
        } else {
            const promptMessage = prompt("أدخل نص الملاحظة");
            if (promptMessage && promptMessage.trim() !== "") {
                const ayahWithNote = { ...selectedAyah, note: promptMessage };
                localStorage.setItem("marks", JSON.stringify([...marks, ayahWithNote]));
                setIsMarked(true);
                onClose();
            }
        }
        if (onUpdate) {
            onUpdate();
        }
    }

    useEffect(() => {
        const ayas = JSON.parse(localStorage.getItem("ayas") || "[]");
        const marks = JSON.parse(localStorage.getItem("marks") || "[]");

        if (selectedAyah) {
            const isExist = ayas.find((aya: any) => aya?.number === selectedAyah.number);
            setIsExist(!!isExist);

            const isMarkedExist = marks.find((mark: any) => mark?.number === selectedAyah.number);
            setIsMarked(!!isMarkedExist);
        }
    }, [selectedAyah]);

    return (
        <>
            <div onClick={onClose} className={`${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-10 bg-black/50`}></div>
            <div className={`${isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-300 fixed top-1/2 left-1/2 -translate-1/2 z-20 lg:w-96 w-10/12 m-auto bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-lg`}>
                <button onClick={onClose} className="cursor-pointer transition duration-200 hover:text-(--main-color) dark:text-gray-200 absolute top-2 right-2">
                    <MdClose size={30} />
                </button>

                <ul className="flex flex-col gap-2 mt-6">
                    <li
                        onClick={handleMarkClick}
                        className="group flex items-center justify-end gap-2 flex-row-reverse border-b border-gray-200 dark:border-gray-700 py-3 mb-2 last:mb-0 cursor-pointer dark:text-gray-200"
                    >
                        <span className="custom_transition group-hover:pr-2">
                            {isMarked ? "إزالة العلامة" : "إضافة علامة"}
                        </span>
                        <FaBookmark size={25} className="text-yellow-500" />
                    </li>
                    <li
                        onClick={handleAayaToFavorite}
                        className="group flex items-center justify-end gap-2 flex-row-reverse border-b border-gray-200 dark:border-gray-700 py-3 mb-2 last:mb-0 cursor-pointer dark:text-gray-200"
                    >
                        <span className="custom_transition group-hover:pr-2">
                            {isExist ? "إزالة من المفضلة" : "إضافة في المفضلة"}
                        </span>
                        <MdFavorite size={25} className="text-red-500" />
                    </li>
                </ul>
            </div>
        </>
    )
}
export default SavedSurha;