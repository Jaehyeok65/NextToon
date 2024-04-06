'use client';

import React from 'react';
import styles from '@/style/detail.module.css';
import {
    getServiceName,
    getSerialDay,
    AddBookMark,
    CheckBookMark,
} from '@/utils/Bookmark';
import { FaHeart } from 'react-icons/fa6';
import { WebtoonInfo } from '@/types/type';

export default function ClientComponent({
    data,
}: {
    data: WebtoonInfo | undefined;
}) {
    const onAddClick = () => {
        if (data) {
            AddBookMark(data);
    };
}

    return (
        <div className={styles.container}>
            <div>
                <img src={data?.img} alt={data?.title} />
            </div>
            <div className={styles.textcontainer}>
                <div>{data?.title}</div>
                <div>{data?.author}</div>
                <div>{data && getServiceName(data.service)}</div>
                <div>{data?.updateDays && getSerialDay(data.updateDays)}</div>
                <div>
                    <FaHeart color="red" /> {data?.fanCount + '만++'}
                </div>
                <button onClick={onAddClick}>북마크 추가하기</button>
            </div>
        </div>
    );
}
