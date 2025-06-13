import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-4">
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
                <SwiperSlide>
                    <img
                        src="https://i.ibb.co/svBCN4M1/Gaming.jpg"
                        alt="Tech Gadget Box"
                        className="w-full h-[400px] object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://i.ibb.co/r2mZ9XS5/running.jpg"
                        alt="Organic Beauty Box"
                        className="w-full h-[400px] object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://i.ibb.co/tpf32Dpv/reading.jpg"
                        alt="Book Lovers Box"
                        className="w-full h-[400px] object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://i.ibb.co/yFVPyXR2/fishing.jpg"
                        alt="Book Lovers Box"
                        className="w-full h-[400px] object-cover"
                    />
                </SwiperSlide>
               
            </Swiper>
        </div>
    );
};

export default Slider;
