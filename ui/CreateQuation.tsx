"use client";
import { FormEvent, useEffect, useState } from "react";
import CustomTitle from "./CustomTitle";
import { supabase } from "@/lib/supabaseClient";


interface CreateQuestionProps {
    name: string;
    question: string;
    gender: string;
    result: string;
    success: boolean;
}


// component add new Question
const CreateQuestion: React.FC = () => {
    const [question, setQuestion] = useState<CreateQuestionProps>({
        name: "",
        question: "",
        result: "",
        gender: "",
        success: false
    });
    const [showQuestions, setShowQuestions] = useState<CreateQuestionProps[]>([]);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuestion(prev =>
            ({ ...prev, [name]: value })
        );
    }

    const sendQuestion = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault();
        if (!question.name || !question.question || !question.gender) {
            setMessage(" من فضلك تأكد من إدخال جميع البيانات المطلوبة بشكل صحيح ");
            return;
        }
        try {
            setMessage("");
            const { data, error } = await supabase
                .from("question")
                .insert({
                    userName: question.name,
                    question: question.question,
                    result: question.result,
                    success: question.success,
                    gender: question.gender
                })
                .select();
            if (!error && data) setShowQuestions(prev => [...prev, data[0]])
            setQuestion({
                name: "",
                question: "",
                result: "",
                gender: "",
                success: false
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <CustomTitle
                title=" شارك بسؤالك "
                success={false}
            />
            {message && (
                <div className="bg-red-50 text-right dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-100 dark:border-red-800">
                    {message}
                </div>
            )}
            <form
                onSubmit={sendQuestion}
                method="post">
                <input
                    type="text"
                    name="question"
                    id="question"
                    placeholder=" أضف السوال "
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg
                text-right outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color)
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    onChange={handelChange}
                    value={question.question}
                />
                <textarea
                    name="result"
                    id="result"
                    placeholder=" أضف الأجابة "
                    className="resize-none w-full h-30 p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                text-right mb-4 outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color)
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    onChange={handelChange}
                    value={question.result}
                >

                </textarea>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="أضف اسمك"
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg
                text-right outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color)
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    onChange={handelChange}
                    value={question.name}
                />

                <select
                    name="gender"
                    id="gender"
                    className="w-full  p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                text-right outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color)
                dark:bg-gray-700 dark:text-white"
                    onChange={handelChange}
                    value={question.gender}
                >
                    <option value="" disabled>اختر</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                </select>
                <button
                    type="submit"
                    className="block ml-auto mt-4 p-2 bg-(--main-color) text-white rounded-lg
                    cursor-pointer  hover:text-white hover:bg-[#264f37] transition-all duration-300
                    w-33 text-right text-[20px]"
                > {loading ? " جاري الأضافة... " : "أضف"} </button>
            </form>
        </div>
    )
}
export default CreateQuestion;