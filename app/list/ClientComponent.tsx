'use client';
import React, { useState } from 'react';
import useObserver from '@/hooks/useObserver';
import Card from '@/components/Card';
import Skeleton from '@/utils/Skeleton';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import useScroll from '@/hooks/useScroll';
import Error from '@/utils/ErrorComponent';
import Navigate from '@/components/Navigate';
import { useWebtoonList } from './hooks/useWebtoosList';
import { useCategory } from './hooks/useCategory';


export default function Client2() {
    const { category, setCategory, SelectedCategory } = useCategory();

    const {
        webtoons,
        hasNextPage,
        fetchNextPage,
        isError,
        isFetchingNextPage,
        isPending,
        refetch,
        error,
    } = useWebtoonList({ category });

    const ref = useObserver(hasNextPage, fetchNextPage);

    useScroll();

    if (isError) {
        return <Error error={error || undefined} reset={refetch} />;
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
                    {webtoons?.map((webtoon: WebtoonInfo) => (
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
                    ))}
                </div>
                {!isPending && <div ref={ref}></div>}
                {isFetchingNextPage && <Skeleton />}
            </div>
        </>
    );
}
