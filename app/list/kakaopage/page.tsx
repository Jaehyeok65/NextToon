import { QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import ClientComponent from './ClientComponent';
import { getServiceWebtoonList } from '@/services/API';

export default async function page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['kakaopagewebtoon'],
        queryFn: ({ pageParam }) => {
            return getServiceWebtoonList(pageParam,'kakaoPage');
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
