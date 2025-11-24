"use client";
import { useState, useEffect } from "react";
import SavedSurha from "@/components/quran/SavedSurha";
import SurahDisplay from "@/ui/Surha";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";

interface SurahContainerProps {
    surah: any;
}

const SurahContainer: React.FC<SurahContainerProps> = ({ surah }) => {
    const [showSaved, setShowSaved] = useState(false);
    const [selectedAyah, setSelectedAyah] = useState<any>(null);
    const [marks, setMarks] = useState<any[]>([]);

    const updateMarks = () => {
        const storedMarks = JSON.parse(localStorage.getItem("marks") || "[]");
        setMarks(storedMarks);
    };

    useEffect(() => {
        updateMarks();
    }, []);

    const handleClose = () => {
        setShowSaved(!showSaved);
    };

    const handleAyahClick = (ayah: any) => {
        setSelectedAyah(ayah)
    };

    const handleShowSaved = () => {
        setShowSaved(!showSaved);
    };

    return (
        <>
            <SavedSurha
                isOpen={showSaved}
                onClose={handleClose}
                selectedAyah={selectedAyah}
                onUpdate={updateMarks}
            />
            <section className="py-16">
                <CustomContainer>
                    <div>
                        <CustomTitle
                            title="سور القرآن"
                            success={true}
                            description="تصفح سور القرآن الكريم، تعلّم معانيها، وتأمل في هدايتها وقيمتها الروحية لتعميق الصلة بالله"
                        />

                        <div className="mt-10">
                            <SurahDisplay
                                surah={surah}
                                onAyahClick={handleShowSaved}
                                handleAyahClick={handleAyahClick}
                                marks={marks}
                            />

                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    );
};

export default SurahContainer;
