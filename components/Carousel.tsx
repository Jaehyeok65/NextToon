'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/style/carousel.module.css';
import Card from './Card';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const Carousel = ({ list }: { list: any[] }) => {
    const [current, setCurrent] = useState(5); //현재 페이지
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    const [depth, setDepth] = useState(1); //default값을 1
    const end = list.length - 1;
    const lastindex = end - depth + 1;
    const [animate, setAnimate] = useState<string>('carouselmount');

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 언마운트되면 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 이펙트가 실행되도록 합니다.

    useEffect(() => {
        if (windowWidth < 600) {
            setDepth(1);
        } else if (windowWidth < 1000) {
            setDepth(2);
        } else if (windowWidth < 1400) {
            setDepth(3);
        } else {
            setDepth(4);
        }

        // 5초마다 getNextPage 함수 호출
        const intervalId = setInterval(() => {
            const nextPage = getNextPage(current);
            +setCurrent(nextPage);
            setAnimate('carouselmount');
        }, 5000);

        // 컴포넌트가 언마운트되면 clearInterval 호출하여 타이머 제거
        return () => {
            clearInterval(intervalId);
        };
    }, [windowWidth, current]);

    const getNextPage = (page: number) => {
        return page + depth > lastindex ? 0 : page + depth;
    };

    const getPrevPage = (page: number) => {
        return page - 1 < 0 ? lastindex : page - 1;
    };

    const handleNextClick = () => {
        const nextPage = getNextPage(current);
        setAnimate('carouselmount');
        setCurrent(nextPage);
    };

    const handlePrevClick = () => {
        const prevPage = getPrevPage(current);
        setAnimate('carouselmount');
        setCurrent(prevPage);
    };

    const handleAnimationEnd = () => {
        setAnimate('');
    };

    return (
        <div className={styles.carousel}>
            <button className={styles.button} onClick={handlePrevClick}>
                <FaArrowLeft />
            </button>
            <div className={styles.innercarousel}>
                {list
                    .slice(current, current + depth)
                    .map((item: any, index: number) => (
                        <div
                            key={index}
                            className={styles[animate]}
                            onAnimationEnd={handleAnimationEnd}
                        >
                            <Card
                                _id={item._id}
                                img={item.img}
                                title={item.title}
                                author={item.author}
                                service={item.service}
                            />
                        </div>
                    ))}
            </div>
            <button className={styles.button2} onClick={handleNextClick}>
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Carousel;
