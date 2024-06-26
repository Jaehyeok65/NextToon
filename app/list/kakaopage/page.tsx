import { QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import ClientComponent from './ClientComponent';
import { getServiceWebtoonList } from '@/services/API';

export const metadata = {
    title: 'NextToon | 카카오페이지웹툰',
};

export default async function page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['kakaopagewebtoon'],
        queryFn: ({ pageParam }) => {
            return getServiceWebtoonList(pageParam, 'KAKAO_PAGE');
        },
        initialPageParam: 1,
    });
    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    return (
        <HydrationBoundary state={dehydratedState}>
            <ClientComponent />
        </HydrationBoundary>
    );
}
