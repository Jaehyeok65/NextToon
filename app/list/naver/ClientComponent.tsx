'use client';
import React from 'react';
import { getServiceWebtoonList } from '@/services/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '@/hooks/userObserver';
import Card from '@/components/Card';
import Skeleton from '@/utils/Skeleton';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';



export default function Client2() {
    const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending, data } =
        useInfiniteQuery({
            queryKey: ['naverwebtoon'],
            queryFn: ({ pageParam = 1 }) => {
                return getServiceWebtoonList(pageParam,'naver');
            },
            getNextPageParam: (lastPage, allPages) => {
                if(lastPage.length < 10) {
                    return undefined;
                }
                else {
                    return allPages.length + 1;
                }
            },
            initialPageParam: 1,
            refetchOnWindowFocus : false,
            refetchIntervalInBackground : false
        });

    const ref = useObserver(hasNextPage, fetchNextPage);

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
