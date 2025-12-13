"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CiPlay1 } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import axios from 'axios';


interface HeroProps {
    id: number,
    type: string,
    title: string,
    link: string,
    image: string
    description?: string;
}

const HeroSection: React.FC = () => {
    const [hero, setHero] = useState<HeroProps[]>([]);
    const [playingId, setPlayingId] = useState<number | null>(null);

    const getHeroSectionContent = async () => {
        try {
            axios.get("/db.json")
                .then((ele) => {
                    console.log(ele);
                    setHero(ele.data.heroSlides);
                });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getHeroSectionContent();
    }, []);

    function getEmbedLink(url: string) {
        const match = url.match(/v=([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url; // fallback
    }

    function getVideoId(url: string) {
        const match = url.match(/v=([a-zA-Z0-9_-]+)/);
        return match ? match[1] : "";
    }

    return (
        <section className='lg:p-6 md:p-2 p-0 bg-gray-100 dark:bg-gray-900'>
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                loop
                className="w-full lg:rounded-2xl"
            >
                {Array.isArray(hero) && hero.map((slide) => {
                    const isPlaying = playingId === slide.id;
                    const videoId = slide.type === "video" ? getVideoId(slide.link) : null;
                    return (
                        <SwiperSlide key={slide.id} className="w-screen">
                            <div className='w-screen lg:h-[670px] md:h-[450px] h-[300px] relative overflow-hidden'>
                                {slide.type === "video" && videoId ? (
                                    <>
                                        {isPlaying && (
                                            <div
                                                className="fixed top-0 inset-0 z-50 flex items-center justify-center pointer-events-none"
                                            >
                                                <div
                                                    className="relative w-full max-w-5xl lg:h-[550px] md:h-[350px] h-[260px] aspect-video p-4 pointer-events-auto"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={() => setPlayingId(null)}
                                                        className="absolute lg:-top-3 md:-top-2 top-1 lg:-right-1 md:-right-2 right-3 z-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer
                                                        "
                                                    >
                                                        <MdClose size={24} />
                                                    </button>
                                                    <iframe
                                                        className="w-full h-full rounded-lg shadow-2xl"
                                                        src={`${getEmbedLink(slide.link)}?autoplay=1`}
                                                        title={slide.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        )}
                                        <div className={`${isPlaying ? "fixed inset-0 z-20 bg-black/75 backdrop-blur-[5px]" : "hidden"}`} />
                                        <div
                                            className="w-full h-full relative cursor-pointer"
                                            onClick={() => setPlayingId(slide.id)}
                                        >
                                            <Image
                                                src={slide.image}
                                                alt={slide.title}
                                                fill
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-[#ceaf15] rounded-full flex items-center justify-center">
                                                    <span className="text-2xl text-(--main-color)">
                                                        <CiPlay1 size={30} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className='relative w-full h-full'>
                                        <div className='w-full h-full absolute z-10 bg-black/40 ' />
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                        />
                                        <div className='absolute lg:top-[40%] top-16 lg:right-16 right-12 text-white z-50'>
                                            <h3 className="text-lg font-bold text-(--main-color)">{slide.title}</h3>
                                            <p className="text-3xl leading-11 lg:w-[450px] md:w-96 ">{slide.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}

export default HeroSection;
