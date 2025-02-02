'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperComponentProps {
    slidesData: Array<{
        imgSrc: string;
        imgAlt: string;
        title: string;
        desc: string[];
        videoId: string;
    }>;
    landingYoutube: (videoId: string, index: string) => void;
}

const SwiperComponent = ({ slidesData, landingYoutube }: SwiperComponentProps) => {
    const renderSlide = (
        data: { imgSrc: string; imgAlt: string; title: string; desc: string[]; videoId: string },
        index: number
    ) => {
        return (
            <SwiperSlide key={index}>
                <a
                    href='#none'
                    className='card-item'
                    onClick={() => landingYoutube(data.videoId, (index + 1).toString())}
                >
                    <img src={data.imgSrc} alt={data.imgAlt} className='card-img' />
                    <div className='card-title'>
                        <p className='title'>{data.title}</p>
                        <div className='desc'>
                            {data.desc.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>
                </a>
            </SwiperSlide>
        );
    };

    return (
        <Swiper
            slidesPerView={'auto'}
            centeredSlides
            spaceBetween={90}
            grabCursor
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
        >
            {slidesData.map(renderSlide)}
        </Swiper>
    );
};

export default SwiperComponent;
