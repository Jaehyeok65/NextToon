'use client';
import React from 'react';
import { SubmitPage } from '@/services/springboot';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '@/hooks/userObserver';
import Card from '@/components/Card';
import Skeleton from '@/utils/Skeleton';
import styled from 'styled-components';
import styles from './style.module.css';

const BackGround = styled.div`
    margin: 10% 20% 10% 20%;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
`;

export default function Client2() {
    const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending, data } =
        useInfiniteQuery({
            queryKey: ['wuxia'],
            queryFn: ({ pageParam = 1 }) => {
                return SubmitPage(pageParam);
            },
            getNextPageParam: (lastPage, allPages) => {
                if(lastPage.length < 12) {
                    return undefined;
                }
                else {
                    return allPages.length + 1;
                }
            },
            initialPageParam: 1,
        });

    const ref = useObserver(hasNextPage, fetchNextPage);

    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    {data?.pages.map((page: any) =>
                        page.map((wuxia: any, index: number) => (
                            <Card
                                key={index}
                                url={wuxia.url}
                                name={wuxia.title}
                                price="10000"
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
