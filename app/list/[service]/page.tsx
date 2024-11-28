import { HydrationBoundary } from '@tanstack/react-query';
import ClientComponent from './components/ClientComponent';
import { preFetchData } from '../util/preFetchData';

export const metadata = {
    title: 'NextToon',
};

const day: any = {
    0: '일요웹툰',
    1: '월요웹툰',
    2: '화요웹툰',
    3: '수요웹툰',
    4: '목요웹툰',
    5: '금요웹툰',
    6: '토요웹툰',
};

export default async function page({
    params,
}: {
    params: { service: string };
}) {
    const allowedServices = ['kakao', 'naver', 'kakaopage'];

    if (!allowedServices.includes(params.service)) {
        return {
            notFound: true, // Next.js가 404 페이지를 보여줌
        };
    }
    const category = day[new Date().getDay()];
    const dehydratedState = await preFetchData({
        service: params.service,
        category,
    });

    return (
        <HydrationBoundary state={dehydratedState}>
            <ClientComponent service={params.service} />
        </HydrationBoundary>
    );
}
