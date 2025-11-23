"use client"
import { supabase } from "@/lib/supabaseClient";
import AccordionItem from "@/ui/Accordion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

interface CreateQuestionProps {
    id: number;
    userName: string;
    question: string;
    gender: string;
    result: string;
    success: boolean;
}

const AllQuestions: React.FC = () => {
    const [showQuestions, setShowQuestions] = useState<CreateQuestionProps[]>([])

    const getQuestions = async () => {
        const { data, error } = await supabase.from("question").select("*");
        if (!error) setShowQuestions(data)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="mb-4">
            {showQuestions.map((ques) => (
                ques.success && (
                    <AccordionItem key={ques.id}
                        title={ques.question}>
                        <div className="flex items-center flex-col">
                            <div className="flex items-center gap-3 flex-row border-b border-gray-300 dark:border-gray-700 w-full pb-1.5">
                                {
                                    ques.gender === "أنثى" ? (
                                        <Image
                                            src="/images/female.jpg"
                                            title={ques.question}
                                            alt="avatar"
                                            width={40}
                                            height={100}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <Image
                                            src="/images/male.png"
                                            title={ques.question}
                                            alt="avatar"
                                            width={40}
                                            height={100}
                                            className="rounded-full"
                                        />
                                    )
                                }
                                <div>
                                    <h4 className="text-(--main-color) dark:text-[#4ade80] font-semibold flex flex-row gap-0.5">
                                        <span>{ques.userName}</span>
                                        <span className="text-sm font-medium">{ques.gender === "ذكر" ? (
                                            <IoMdMale size={23} />
                                        ) : (
                                            <IoMdFemale size={23} />
                                        )}</span>
                                    </h4>
                                </div>
                            </div>
                            <p className="p-3 leading-7 text-right ml-auto text-gray-800 dark:text-gray-200">{ques.result}</p>
                        </div>
                    </AccordionItem>
                )
            ))}
        </div>
    )
}

export default AllQuestions;
