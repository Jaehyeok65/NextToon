'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/style/carousel.module.css';
import Card from '../Card';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { WebtoonInfo } from '@/types/type';

const Carousel = ({
    list,
    initialdepth,
}: {
    list: any[];
    initialdepth: number;
}) => {
    const [current, setCurrent] = useState(0); //현재 페이지
    const [depth, setDepth] = useState(initialdepth); //default값을 1
    const end = list?.length - 1;
    const lastindex = end - depth + 1;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setDepth(1);
            } else if (window.innerWidth < 1000) {
                setDepth(2);
            } else if (window.innerWidth < 1400) {
                setDepth(3);
            } else {
                setDepth(4);
            }
        };

        handleResize(); // 초기 렌더링 시 한 번 실행

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // 5초마다 getNextPage 함수 호출
        const intervalId = setInterval(() => {
            const nextPage = getNextPage(current);
            +setCurrent(nextPage);
        }, 5000);

        // 컴포넌트가 언마운트되면 clearInterval 호출하여 타이머 제거
        return () => {
            clearInterval(intervalId);
        };
    }, [current]);

    const getNextPage = (page: number) => {
        return page + depth > lastindex ? 0 : page + depth;
    };

    const getPrevPage = (page: number) => {
        return page - depth < 0 ? lastindex : page - depth;
    };

    const handleNextClick = () => {
        const nextPage = getNextPage(current);
        setCurrent(nextPage);
    };

    const handlePrevClick = () => {
        const prevPage = getPrevPage(current);
        setCurrent(prevPage);
    };

    return (
        <div className={styles.carousel}>
            <button
                className={styles.button}
                onClick={handlePrevClick}
                data-testid="left"
            >
                <FaArrowLeft />
            </button>
            <div className={styles.innercarousel}>
                {list
                    ?.slice(current, current + depth)
                    .map((webtoon: WebtoonInfo, index: number) => (
                        <Card
                            key={index}
                            id={webtoon.id}
                            thumbnail={webtoon.thumbnail}
                            title={webtoon.title}
                            authors={webtoon.authors}
                            provider={webtoon.provider}
                            fanCount={webtoon.fanCount}
                            updateDays={webtoon.updateDays}
                            isEnd={webtoon.isEnd}
                        />
                    ))}
            </div>
            <button
                className={styles.button2}
                onClick={handleNextClick}
                data-testid="right"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Carousel;
