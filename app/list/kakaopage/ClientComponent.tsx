'use client';
import React, { useEffect, useState } from 'react';
import { getServiceWebtoonList } from '@/services/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '@/hooks/useObserver';
import Card from '@/components/Card';
import Skeleton from '@/utils/Skeleton';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import useScroll from '@/hooks/useScroll';
import { usePathname } from 'next/navigation';
import Error from '@/utils/ErrorComponent';
import Navigate from '@/components/Navigate';

const day: any = {
    0: '일요웹툰',
    1: '월요웹툰',
    2: '화요웹툰',
    3: '수요웹툰',
    4: '목요웹툰',
    5: '금요웹툰',
    6: '토요웹툰',
};

const SelectedCategory = [
    '전체보기',
    '월요웹툰',
    '화요웹툰',
    '수요웹툰',
    '목요웹툰',
    '금요웹툰',
    '토요웹툰',
    '일요웹툰',
];

export default function Client2() {
    const [category, setCategory] = useState<string>(day[new Date().getDay()]);

    console.log(category);

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        data,
        isError,
        error,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['kakaopagewebtoon', category],
        queryFn: ({ pageParam = 1 }) => {
            return getServiceWebtoonList(pageParam, 'KAKAO_PAGE', category);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.webtoons?.length < 12) {
                return undefined;
            } else {
                return allPages.length + 1;
            }
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: false,
        staleTime: 600000,
    });


    const ref = useObserver(hasNextPage, fetchNextPage);

    const scroll: number = useScroll(); //스크롤 높이 저장용
    const pathname = usePathname();

    useEffect(() => {
        if (scroll) {
            //scrorll이 0임을 방지
            window.sessionStorage.setItem(
                `${pathname}_scroll`,
                scroll.toString()
            );
        }
    }, [scroll, pathname]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(`${pathname}_scroll`);
        if (scrolly) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [pathname]);

    if (isError) {
        return <Error error={error} reset={refetch} />;
    }

    return (
        <>
            <div className={styles.background}>
                <Navigate
                    category={category}
                    setCategory={setCategory}
                    SelectedCategory={SelectedCategory}
                />
                <div className={styles.container}>
                    {data?.pages.map((page: any) =>
                        page?.webtoons?.map((webtoon: WebtoonInfo) => (
                            <Card
                                key={webtoon.id}
                                id={webtoon.id}
                                thumbnail={webtoon.thumbnail}
                                title={webtoon.title}
                                authors={webtoon.authors}
                                provider={webtoon.provider}
                                updateDays={webtoon.updateDays}
                                fanCount={webtoon.fanCount}
                                isEnd={webtoon.isEnd}
                                isUpdated={webtoon.isUpdated}
                            />
                        ))
                    )}
                </div>
                {!isPending && <div ref={ref}></div>}
                {isFetchingNextPage && <Skeleton />}
            </div>
        </>
    );
}
