'use client';

import React, { forwardRef } from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Call } from './types';
import dynamic from 'next/dynamic';

const SwiperComponent = dynamic(() => import('./SwiperComponent'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
});

interface RotateSwiperProps {
    callList: Call[];
}

const RotateSwiperSection = forwardRef<HTMLDivElement, RotateSwiperProps>(({ callList }, ref) => {
    RotateSwiperSection.displayName = 'RotateSwiperSection';
    const landingYoutube = (videoId: string, index: string, page?: string) => {
        window.open(`https://www.youtube.com/shorts/${videoId}`, '_blank');
    };

    const slidesData =
        callList?.[0]?.searchResult?.map((result) => ({
            imgSrc: result.youtube.contents[0]?.isShort
                ? result.youtube.contents[0]?.thumbnailUrl
                : '/res/img/rotate_card_empty.png?v=1',
            imgAlt: result.youtube.contents[0]?.isShort ? '유튜브 썸네일' : 'empty',
            title: result.youtube.query, // '# 타이틀 두줄, 영역 넘치게 된다면 넘치는 만큼 말줄임(...) 처리됩니다.',
            desc: result.youtube.tags || [],
            videoId: result.youtube.contents[0]?.videoId,
        })) || [];

    // 슬라이드 구조를 함수나 별도 컴포넌트로 추출할 수도 있음
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
        <div className='swiper rotateSwiper' ref={ref}>
            <SwiperComponent slidesData={slidesData} landingYoutube={landingYoutube} />
        </div>
    );
});

export default RotateSwiperSection;
