import { useInfiniteQuery } from '@tanstack/react-query';
import { getWebtoonList, getServiceWebtoonList } from '@/services/API';

interface UseWebtoonListProps {
    service?: string; // 서비스 이름 (없을 수도 있음)
    category: string; // 카테고리
}

export const useWebtoonList = ({ service, category }: UseWebtoonListProps) => {
    // 쿼리 키와 함수 설정
    const queryKey = service ? [service, category] : ['webtoon', category];
    const queryFn = service
        ? ({ pageParam = 1 }) =>
              getServiceWebtoonList(pageParam, service, category)
        : ({ pageParam = 1 }) => getWebtoonList(pageParam, category);

    // useInfiniteQuery 훅 사용
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        isPending,
        refetch,
        error
    } = useInfiniteQuery({
        queryKey,
        queryFn,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.webtoons?.length < 12) {
                return undefined; // 더 이상 페이지가 없으면 undefined 리턴
            } else {
                return allPages.length + 1; // 다음 페이지를 가져오기 위한 페이지 번호
            }
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: false,
        staleTime: 600000,
    });

    // 데이터와 관련된 상태값들 반환
    return {
        webtoons: data?.pages.flatMap((page) => page.webtoons) || [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        isPending,
        refetch,
        error
    };
};
