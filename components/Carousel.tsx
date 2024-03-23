'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/style/carousel.module.css';
import Card from './Card';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Carousel = ({ list }: { list: any[] }) => {
    const [current, setCurrent] = useState(5); //현재 페이지
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [depth, setDepth] = useState(1); //default값을 1
    const end = list.length - 1;
    const lastindex = end - depth + 1;


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
        if(windowWidth < 600) {
            setDepth(1);
        }
        else if(windowWidth < 1000) {
            setDepth(2);
        }
        else {
            setDepth(3);
        }

         // 5초마다 getNextPage 함수 호출
         const intervalId = setInterval(() => {
            getNextPage(current);
        }, 5000);

        // 컴포넌트가 언마운트되면 clearInterval 호출하여 타이머 제거
        return () => {
            clearInterval(intervalId);
        };
    }, [windowWidth, current]);

    const getNextPage = (page: number) => {
        if (page + 1 > lastindex) {
            setCurrent(0);
        } else {
            setCurrent(page + 1);
        }
    };

    const getPrevPage = (page: number) => {
        if (page - 1 < 0) {
            setCurrent(lastindex);
        } else {
            setCurrent(page - 1);
        }
    };


    return (
        <div className={styles.carousel}>
            <button className={styles.button} onClick={() => getPrevPage(current)}><FaArrowLeft color='blue' size='20px'/></button>
            <div className={styles.innercarousel}>
                {list
                    .slice(current, current + depth)
                    .map((item: any, index: number) => (
                        <Card
                            key={index}
                            _id={item._id}
                            img={item.img}
                            title={item.title}
                            author={item.author}
                            service={item.service}
                        />
                    ))}
            </div>
            <button className={styles.button2} onClick={() => getNextPage(current)}><FaArrowRight color='blue' size='20px'/></button>
        </div>
    );
};

export default Carousel;
