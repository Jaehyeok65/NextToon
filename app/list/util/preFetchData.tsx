import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getWebtoonList, getServiceWebtoonList } from '@/services/API';

interface UseWebtoonPreFetchProps {
    service?: string; // 서비스 이름 (없을 수도 있음)
    category: string; // 카테고리
}

// 서버 사이드에서는 리액트 훅을 사용하지 못하므로 비동기 함수로 선언
export const preFetchData = async ({
    service,
    category,
}: UseWebtoonPreFetchProps) => {
    // 쿼리 키와 함수 설정
    const queryKey = service ? [service, category] : ['webtoon', category];
    const queryFn = service
        ? ({ pageParam = 1 }) =>
              getServiceWebtoonList(pageParam, service, category)
        : ({ pageParam = 1 }) => getWebtoonList(pageParam, category);
    const queryClient = new QueryClient();

    console.log(queryKey);

    // InfiniteQuery의 데이터를 미리 가져오는 prefetching
    await queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 1,
    });

    // QueryClient에서 데이터를 'dehydrate'해서 React 컴포넌트로 전달할 수 있게 변환
    const dehydratedState = dehydrate(queryClient);

    return dehydratedState;
};
