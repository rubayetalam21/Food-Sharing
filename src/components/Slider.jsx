import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
    {
        img: "https://i.ibb.co/pr3rZjrs/1.jpg",
        title: "Food Distribution",
        subtitle: "Distribution of food to the poor people",
    },
    {
        img: "https://i.ibb.co/v6xM5gn7/2.jpg",
        title: "Food Distribution",
        subtitle: "Distribution of food to the poor people",
    },
    {
        img: "https://i.ibb.co/qYfT45NS/3.jpg",
        title: "Food Distribution",
        subtitle: "Distribution of food to the poor people",
    },
    {
        img: "https://i.ibb.co.com/vxwqBSpc/4.jpg",
        title: "Food Distribution",
        subtitle: "Distribution of food to the poor people",
    },
];

const Slider = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-4 my-12">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="rounded-xl overflow-hidden"
            >
                {slides.map(({ img, title, subtitle }, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-[400px] object-cover"
                            loading="lazy"
                        />
                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                            <h3 className="text-white text-2xl font-bold">{title}</h3>
                            <p className="text-gray-300 mt-1">{subtitle}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
