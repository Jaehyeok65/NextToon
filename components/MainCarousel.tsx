'use client';

import React from 'react';
import Link from 'next/link';
import Carousel from './Carousel';
import styles from '@/style/carousel.module.css';

const MainCarousel = ({
    list,
    title,
    address,
}: {
    list: any;
    title: string;
    address: string;
}) => {
    return (
        <div className={styles.maincarousel}>
            <div className={styles.maininner}>
                <h4>{title}</h4>
                <Link href={address} prefetch>
                    <h4>바로가기</h4>
                </Link>
            </div>
            <Carousel list={list} />
        </div>
    );
};

export default MainCarousel;
