"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CiPlay1 } from "react-icons/ci";
import axios from 'axios';


interface HeroProps {
    id: number,
    type: string,
    title: string,
    link: string,
    image: string
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

    useEffect(() => {
        if (playingId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [playingId]);

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
                autoplay={playingId ? false : { delay: 5000 }}
                className="w-full lg:rounded-2xl"
            >
                {Array.isArray(hero) && hero.map((slide) => {
                    const isPlaying = playingId === slide.id;
                    const videoId = getVideoId(slide.link);
                    return (
                        <SwiperSlide key={slide.id} className="w-screen">
                            <div className='w-screen lg:h-[670px] md:h-[450px] h-[300px] relative overflow-hidden'>
                                {slide.type === "video" && videoId ? (
                                    isPlaying ? (
                                        <div
                                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                                            onClick={() => setPlayingId(null)}
                                        >
                                            <div className="relative w-full max-w-5xl aspect-video p-4">
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
                                    ) : (
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
                                    )
                                ) : (
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                    />
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
