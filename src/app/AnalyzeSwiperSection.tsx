'use client';

import React from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Call } from './types';
import { formatDateTime } from './dataUtils';
import { landingYoutube } from './nativeBridge';

interface AnalyzeSwiperSectionProps {
    callList: Call[]; // 여기에 callList 배열 타입을 정의
}
interface YoutubeItems {
    videoId: string;
    markSrc: string;
    imgSrc: string;
    title: string;
    desc: string[];
}

interface SlideItem {
    callId: string;
    name: string;
    callEndTime: string;
    callStartTime: string;
    pushBody: string;
    youtubeItems: YoutubeItems[];
}

const AnalyzeSwiperSection: React.FC<AnalyzeSwiperSectionProps> = ({ callList }) => {
    // 실제로는 API 호출 결과나 props 등을 통해 데이터를 받아올 수 있지만,
    // 여기서는 예시로 고정된 데이터를 넣어둡니다.
    const SlideItems: SlideItem[] = callList.map((call) => ({
        callId: call.callId,
        name: call.name || '',
        callEndTime: call.callEndTime,
        callStartTime: call.callStartTime,
        pushBody: call.pushBody,
        youtubeItems: call.searchResult.map((result) => ({
            videoId: result.youtube.contents[0].videoId,
            markSrc: 'res/img/analyze_card_mark.svg',
            imgSrc: result.youtube.contents[0].thumbnailUrl,
            title: result.youtube.query,
            desc: result.youtube.tags,
        })),
    }));

    return (
        <Swiper
            className='analyzeSwiper'
            slidesPerView={'auto'}
            spaceBetween={28}
            grabCursor
            pagination={{
                el: '.analyzeSwiper .swiper-pagination',
                clickable: true,
                type: 'fraction',
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[Pagination, Navigation]}
        >
            {SlideItems.map((slide, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                    <div className='analyze-box'>
                        <div className='analyze-box__title-wrap'>
                            <p className='title'>{slide.pushBody}</p>
                            <p className='user-info'>
                                <span className='user'>
                                    {/*<img*/}
                                    {/*    src='https://dummyimage.com/20x20/000000/fff'*/}
                                    {/*    alt='사용자 프로필 아이콘 이미지'*/}
                                    {/*    className='mr6'*/}
                                    {/*/>*/}
                                    <em>{slide.name}</em>
                                    <span>&nbsp;님과 통화</span>
                                </span>
                                <span className='time'>{formatDateTime(slide.callStartTime)}</span>
                            </p>
                        </div>
                    </div>
                    {slide.youtubeItems.map((youtubeItem, itemIndex) => (
                        <a
                            href={'#!'}
                            key={`${slideIndex}_${itemIndex}`}
                            onClick={() =>
                                landingYoutube(
                                    youtubeItem.videoId,
                                    (itemIndex + 1).toString(),
                                    (slideIndex + 1).toString()
                                )
                            }
                        >
                            <div className='item'>
                                <div className='thumb'>
                                    <span className='bg'></span>
                                    <img src={youtubeItem.markSrc} alt='SHORTS' className='mark' />
                                    <img src={youtubeItem.imgSrc} alt='유튜브 썸네일' className='analyze-img' />
                                </div>
                                <div className='title-box'>
                                    <div className='title'>{youtubeItem.title}</div>
                                    <div className='desc'>
                                        {youtubeItem.desc.map((line, lineIndex) => (
                                            <p key={lineIndex}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </SwiperSlide>
            ))}
            <div className='swiper-controll-wrap'>
                <span className='swiper-button-prev'></span>
                <span className='swiper-pagination'></span>
                <span className='swiper-button-next'></span>
            </div>
        </Swiper>
    );
};

export default AnalyzeSwiperSection;
