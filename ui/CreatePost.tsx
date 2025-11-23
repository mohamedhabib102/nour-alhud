'use client';

import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { MdClose } from "react-icons/md";


interface CreatePostProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    getAllPosts: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ toggle, setToggle, getAllPosts }) => {
    const [formData, setFormData] = useState({
        name: '',
        postType: '',
        content: '',
        gender: ''
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name.trim() || !formData.postType.trim() || !formData.content.trim() || !formData.gender) {
            setError('من فضلك تأكد من إدخال جميع البيانات المطلوبة بشكل صحيح');
            return;
        }

        try {
            setLoading(true);
            let publicUrl = null;

            if (image) {
                const fileName = `public/${Date.now()}_${image.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('Images')
                    .upload(fileName, image);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('Images').getPublicUrl(fileName);
                publicUrl = data?.publicUrl;
            }

            const { error: insertError } = await supabase
                .from('posts')
                .insert([{
                    name: formData.name,
                    type: formData.postType,
                    content: formData.content,
                    gender: formData.gender,
                    image_url: publicUrl
                }]);

            if (insertError) throw insertError;

            // Reset form
            setFormData({ name: '', postType: '', content: '', gender: '' });
            removeImage();
            alert('تم إضافة البوست بنجاح');
            setToggle(!toggle);
            getAllPosts();

        } catch (err) {
            console.error('Error adding post:', err);
            setError('حدث خطأ أثناء إضافة البوست، يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-10 bg-black/50`}></div>
            <div className={
                `${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}  fixed z-50 top-1/2 left-1/2 -translate-1/2 w-[90%] h-[550px] overflow-auto max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transition no-scrollbar`
            }>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-(--main-color) dark:text-gray-200 absolute top-2 right-2">
                    <MdClose size={30} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center mt-6">إضافة مشاركة جديدة</h2>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm text-right border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-right">الاسم</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="أدخل اسمك"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0e582d] focus:border-transparent outline-none transition-all text-right dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Post Type Input */}
                    <div>
                        <label htmlFor="postType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-right">نوع البوست</label>
                        <input
                            type="text"
                            id="postType"
                            name="postType"
                            value={formData.postType}
                            onChange={handleChange}
                            placeholder=" اكتب نوع البوست  مثال: عن القرآن الكريم , عن الأمة الأسلامية"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0e582d] focus:border-transparent outline-none transition-all text-right dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Gender Input */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-right">النوع</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0e582d] focus:border-transparent outline-none transition-all text-right bg-white dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">اختر النوع</option>
                            <option value="male">ذكر</option>
                            <option value="female">أنثى</option>
                        </select>
                    </div>

                    {/* Content Input */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-right">محتوى البوست</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="اكتب محتوى البوست هنا"
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0e582d] focus:border-transparent outline-none transition-all resize-none text-right dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div className="flex items-center justify-end gap-4">
                        {preview && (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 group">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-0 right-0 bg-black/50 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity w-full h-full flex items-center justify-center"
                                >
                                    <MdClose size={20} />
                                </button>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#0e582d] dark:hover:text-[#4ade80] transition-colors px-3 py-2 rounded-lg hover:bg-[#0e582d]/10 dark:hover:bg-[#4ade80]/10"
                            title="إضافة صورة"
                        >
                            <span className="text-sm font-medium">إضافة صورة (اختياري)</span>
                            <FaImage size={24} />
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-all
                       ${loading
                                ? 'bg-[#0e582d]/70 cursor-not-allowed'
                                : 'bg-[#0e582d] hover:bg-[#0b4623] hover:shadow-lg active:transform active:scale-[0.99]'
                            }`}
                    >
                        {loading ? 'جاري النشر...' : 'نشر البوست'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreatePost;
