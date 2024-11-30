import { HydrationBoundary } from '@tanstack/react-query';
import ClientComponent from './components/ClientComponent';
import { preFetchData } from '../util/preFetchData';
import { preFetchCategory } from '../util/preFetchCategory';

export const metadata = {
    title: 'NextToon',
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
    const category = preFetchCategory();
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
