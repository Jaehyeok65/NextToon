import { QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { getFirstList, getNextList } from '@/services/firebase';
import { SubmitPage } from '@/services/springboot';
import Client2 from './Client2';

export default async function page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['wuxia'],
        queryFn: ({ pageParam }) => {
            return SubmitPage(pageParam);
        },
        initialPageParam: 1,
    });
    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    return (
        <HydrationBoundary state={dehydratedState}>
            <Client2 />
        </HydrationBoundary>
    );
}
