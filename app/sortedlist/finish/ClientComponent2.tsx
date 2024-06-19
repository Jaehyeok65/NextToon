'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import useScroll from '@/hooks/useScroll';
import { getCurrentDepth, setCurrentDepth } from '@/utils/SortedUtil';

export default function ClientComponent({
    data,
    defaultdepth,
}: {
    data: any;
    defaultdepth: number;
}) {
    const scroll = useScroll();

    const [webtoons, setWebtoons] = useState<any>();
    const [depth, setDepth] = useState<number>(defaultdepth);

    useEffect(() => {
        if (data) {
            setWebtoons(getFilterByFinished(data));
        }
    }, [data]);

    useEffect(() => {
        if (scroll) {
            //scrorll이 0임을 방지
            window.sessionStorage.setItem(
                `sortedlist/finish_scroll`,
                scroll.toString()
            );
        }
    }, [scroll]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(
            `sortedlist/finish_scroll`
        );
        if (scrolly && webtoons) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [webtoons]);

    useEffect(() => {
        const current = getCurrentDepth('finish');
        if (current) {
            setDepth(current);
        }
    }, []);

    const getFilterByFinished = (data: any) => {
        let array: any = [];
        data.map((item: any) => (array = [...array, item.webtoons]));
        const Array = array.reduce(
            (acc: any, curr: number) => acc.concat(curr),
            []
        );
        const finishedArray = Array.filter(
            (item: any) => item.updateDays[0] === 'finished'
        );
        const sortedArray = finishedArray.sort(
            (a: any, b: any) => b.fanCount - a.fanCount
        );

        return sortedArray;
    };

    const getNextWebtoons = () => {
        if (depth + defaultdepth > webtoons.length) {
            setDepth(webtoons.length);
            setCurrentDepth('finish', webtoons.length);
        } else {
            setDepth((prev) => prev + defaultdepth);
            setCurrentDepth('finish', depth + defaultdepth);
        }
    };

    if (!webtoons) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>Loading...</h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {webtoons?.slice(0, depth).map((webtoon: WebtoonInfo) => (
                    <Card
                        key={webtoon.id}
                        id={webtoon.id}
                        thumbnail={webtoon.thumbnail}
                        title={webtoon.title}
                        authors={webtoon.authors}
                        provider={webtoon.provider}
                        setWebtoons={setWebtoons}
                        updateDays={webtoon.updateDays}
                        fanCount={webtoon.fanCount}
                        isEnd={webtoon.isEnd}
                    />
                ))}
            </div>
            {depth < webtoons.length && (
                <div>
                    <button
                        onClick={getNextWebtoons}
                        className={styles.flexbtn}
                    >
                        더 보기
                    </button>
                </div>
            )}
        </div>
    );
}
