'use client';
import React, { useEffect } from 'react';
import { getWebtoonList } from '@/services/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '@/hooks/userObserver';
import Card from '@/components/Card';
import Skeleton from '@/utils/Skeleton';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import { usePathname } from 'next/navigation';
import useScroll from '@/hooks/useScroll';

export default function Client2() {
    const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending, data } =
        useInfiniteQuery({
            queryKey: ['webtoon'],
            queryFn: ({ pageParam = 1 }) => {
                return getWebtoonList(pageParam);
            },
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.length < 10) {
                    return undefined;
                } else {
                    return allPages.length + 1;
                }
            },
            initialPageParam: 1,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            staleTime: 600000,
        });

    const ref = useObserver(hasNextPage, fetchNextPage);

    const scroll = useScroll(); //스크롤 높이 저장용
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

    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    {data?.pages.map((page: any) =>
                        page?.webtoons?.map((webtoon: WebtoonInfo) => (
                            <Card
                                key={webtoon._id}
                                _id={webtoon._id}
                                img={webtoon.img}
                                title={webtoon.title}
                                author={webtoon.author}
                                service={webtoon.service}
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
