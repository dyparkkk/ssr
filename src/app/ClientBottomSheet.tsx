'use client';

import { useState, useEffect } from 'react';
import BottomSheet from './BottomSheat';

interface ClientBottomSheetProps {
    initialTopOffset: number;
    children: React.ReactNode;
}

export default function ClientBottomSheet({ initialTopOffset, children }: ClientBottomSheetProps) {
    const [topOffset, setTopOffset] = useState<number>(initialTopOffset);

    useEffect(() => {
        // 클라이언트에서 실제 위치 계산이 필요한 경우에만 실행
        const calculateActualOffset = () => {
            const paginationEl = document.querySelector('.swiper-pagination');
            if (paginationEl) {
                const paginationBottom = paginationEl.getBoundingClientRect().bottom;
                setTopOffset(paginationBottom + 24);
            }
        };

        calculateActualOffset();

        // 필요한 경우 리사이즈 이벤트 리스너 추가
        window.addEventListener('resize', calculateActualOffset);
        return () => window.removeEventListener('resize', calculateActualOffset);
    }, []);

    return <BottomSheet initialOffsetY={topOffset}>{children}</BottomSheet>;
}
