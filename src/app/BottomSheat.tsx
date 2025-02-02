'use client';

import React, { useRef, useState, useEffect } from 'react';

interface BottomSheetProps {
    children: React.ReactNode;
    initialOffsetY: number; // 반드시 값이 전달되도록 설정
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, initialOffsetY }) => {
    //화면 비율로 수정
    const pxOffset = initialOffsetY + 24; //24px
    initialOffsetY = (pxOffset / window.innerHeight) * 100;

    const sheetRef = useRef<HTMLDivElement>(null);
    const [offsetY, setOffsetY] = useState<number>(initialOffsetY); // 초기값으로 사용

    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(initialOffsetY);

    const maxOffset = 0; // 100% 펼친 상태
    const minOffset = initialOffsetY; // 초기 offsetY 값을 최소값으로 설정
    const threshold = 10; // 드래그 vs 클릭 판별 기준

    const onStart = (clientY: number) => {
        setIsDragging(true);
        setStartY(clientY);
        setCurrentY(offsetY);
    };

    const onMove = (clientY: number) => {
        if (!isDragging) return;
        const deltaY = clientY - startY;
        const newOffset = currentY + (deltaY / window.innerHeight) * 100;
        if (newOffset >= maxOffset && newOffset <= minOffset && sheetRef.current) {
            sheetRef.current.style.transform = `translateY(${newOffset}%)`;
        }
    };

    const onEnd = (clientY: number) => {
        if (!isDragging) return;
        setIsDragging(false);
        const deltaY = clientY - startY;

        if (Math.abs(deltaY) < threshold) {
            if (sheetRef.current) {
                sheetRef.current.style.transition = 'transform 0.3s ease';
                sheetRef.current.style.transform = `translateY(${offsetY}%)`;
            }
            return;
        }

        let newOffset = offsetY;
        if (deltaY > 0) {
            // 아래로 드래그
            newOffset = minOffset;
        } else {
            // 위로 드래그
            newOffset = maxOffset;
        }
        setOffsetY(newOffset);

        if (sheetRef.current) {
            sheetRef.current.style.transition = 'transform 0.3s ease';
            sheetRef.current.style.transform = `translateY(${newOffset}%)`;
        }
    };

    useEffect(() => {
        // BottomSheet가 처음 렌더링되거나 initialOffsetY(=px) 변경 시, 위치 갱신
        if (sheetRef.current) {
            setOffsetY(initialOffsetY);
            setCurrentY(initialOffsetY);

            // transform 반영
            sheetRef.current.style.transform = `translateY(${initialOffsetY}%)`;
        }
    }, [initialOffsetY]);

    // 마우스 이벤트
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onStart(e.clientY);
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            onMove(e.clientY);
        }
    };
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        onEnd(e.clientY);
    };

    // 터치 이벤트
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0) {
            onStart(e.touches[0].clientY);
        }
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0) {
            onMove(e.touches[0].clientY);
        }
    };
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.changedTouches.length > 0) {
            onEnd(e.changedTouches[0].clientY);
        }
    };

    return (
        <div
            className='ixi-O-bottom-sheet'
            ref={sheetRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className='ixi-O-bottom-sheet__header handler'
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <span className='bar'></span>
            </div>
            <div className='ixi-O-bottom-sheet__contents'>
                <div className='analyze-box'>
                    <div
                        className='analyze-box__title-wrap handler2'
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <p className='sub-title'>지난 대화분석</p>
                        {/* <p className="title">다음주 주말에 7살 아이와 에버렌드에 가시나요?</p>
                        <p className="user-info">
                            <span className="user">
                                <img
                                src="https://dummyimage.com/20x20/000000/fff"
                                alt="사용자 프로필 아이콘 이미지"
                                className="mr6"
                                />
                                <em>010-8080-1234</em>
                                <span>&nbsp;님과 통화</span>
                            </span>
                            <span className="time">24년 12월 29일 &middot; 오후 23:59</span>
                        </p> */}
                    </div>
                    {children}
                </div>
            </div>
            <div className='ixi-O-bottom-sheet__footer'></div>
        </div>
    );
};

export default BottomSheet;
