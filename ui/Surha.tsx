"use client";

interface SurhaProps {
    surah: any;
    onAyahClick?: (ayah: any) => void;
    handleAyahClick?: (ayah: any) => void;
    marks?: any[];
}

interface Mark {
    number: number;
    note: string;
}

const SurhaPage: React.FC<SurhaProps> = ({ surah, onAyahClick, handleAyahClick, marks = [] }) => {
    return (
        <>
            {surah.ayahs.map((ayah: any) => (
                <p
                    onClick={() => {
                        if (onAyahClick) {
                            onAyahClick(true)
                        }
                        if (handleAyahClick) {
                            handleAyahClick(ayah)
                        }
                    }}
                    className={`
                        cursor-pointer flex items-center gap-1.5 justify-start flex-row font-quran text-2xl text-right leading-12 mb-6 border-b-2 border-gray-100 dark:border-gray-800 pb-4 last:border-0 hover:text-[#0e582d] dark:hover:text-[#4ade80] transition-colors duration-200
                        ${marks.find((mark: any) => mark?.number === ayah.number) ? "text-[#ab900b] dark:text-[#ab900b] hover:text-[#ab900b] dark:hover:text-[#ab900b]" : ""}
                    `}
                    key={ayah.number}>
                    <span>{ayah.text}</span>
                    <span className="inline-flex items-center justify-center w-10 h-10 relative mx-2 align-middle select-none">
                        <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" fill="none" stroke="currentColor">
                            <circle cx="20" cy="20" r="15" strokeWidth="2" />
                            <circle cx="20" cy="20" r="11" strokeWidth="1" opacity="0.5" />
                            <path d="M15 6 Q 17.5 2 20 6 Q 22.5 2 25 6" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M4 22 Q 1 20 4 18 M 36 22 Q 39 20 36 18" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="relative text-sm font-bold pt-1">{ayah.numberInSurah}</span>
                    </span>
                </p>
            ))}
        </>
    )
}
export default SurhaPage