import { HydrationBoundary } from '@tanstack/react-query';
import ClientComponent from './ClientComponent';
import { preFetchData } from './util/preFetchData';

export const metadata = {
    title: 'NextToon | 전체보기',
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

export default async function page() {
    const category = day[new Date().getDay()];
    const dehydratedState = await preFetchData({ category });

    return (
        <HydrationBoundary state={dehydratedState}>
            <ClientComponent />
        </HydrationBoundary>
    );
}
