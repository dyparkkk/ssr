import RotateSwiperSection from './RotateSwiperSection';
import { formatDateTime } from './dataUtils';
import BottomSheet from './BottomSheat';
import AnalyzeSwiperSection from './AnalyzeSwiperSection';
import './assets/scss/common.scss';
import './assets/reset.css';
import ClientBottomSheet from './ClientBottomSheet';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function getData() {
    const res = await fetch('https://search-services.aicall-lgudev.com/v1/search/list?', {
        headers: {
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_AUTH_TOKEN,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log(`Error :${res.status}`);
        // throw new Error(`HTTP error! ${res}`);
    }

    const data = await res.json();
    return data;
}

export default async function Home() {
    const theme = 'dark';
    const topOffset = 800;

    let data = await getData();
    data = data.data;
    console.log('API Response: data.callList :', data);

    return (
        <div className={`ixi-O-container ${theme}`}>
            <div className='title-wrap'>
                <picture>
                    {/*<source srcSet="/res/img/ai-tips.webp" type="image/webp" />*/}
                    <img src='/res/img/ai-tips.png' alt='' />
                </picture>
                <h2 className='title-wrap__title'>{data.callList?.[0]?.pushBody}</h2>
                <p className='title-wrap__use-info'>
                    <span className='user'>
                        {/*<img*/}
                        {/*    src='https://dummyimage.com/20x20/000000/fff'*/}
                        {/*    alt='사용자 프로필 아이콘 이미지'*/}
                        {/*    className='mr6'*/}
                        {/*/>*/}
                        <em>{data.callList?.[0]?.name}</em>
                        <span>&nbsp;님과 통화</span>
                    </span>
                    <span className='time'>
                        {data.callList?.[0]?.callStartTime ? formatDateTime(data.callList?.[0].callStartTime) : '-'}
                    </span>
                </p>
            </div>

            <RotateSwiperSection callList={[data.callList?.[0]]} />
            {data?.callList?.length > 1 && (
                <ClientBottomSheet initialTopOffset={topOffset}>
                    <AnalyzeSwiperSection callList={data.callList.slice(1)} />
                </ClientBottomSheet>
            )}
        </div>
    );
}
