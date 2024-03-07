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
    title,
    img,
    author,
    service,
    updateDays,
    fanCount,
    _id,
}: WebtoonInfo) {
    const onAddClick = () => {
        if (
            CheckBookMark({
                title,
                img,
                author,
                service,
                updateDays,
                fanCount,
                _id,
            })
        ) {
            //이미 북마크에 등록되어 있다면
            window.alert('이미 북마크에 등록된 작품입니다.');
            return;
        } else {
            AddBookMark({
                title,
                img,
                author,
                service,
                updateDays,
                fanCount,
                _id,
            });
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <img src={img} alt={title} />
            </div>
            <div className={styles.textcontainer}>
                <div>{title}</div>
                <div>{author}</div>
                <div>{getServiceName(service)}</div>
                <div>{updateDays && getSerialDay(updateDays)}</div>
                <div>
                    <FaHeart color="red" /> {fanCount && fanCount + '만++'}
                </div>
                <button onClick={onAddClick}>북마크 추가하기</button>
            </div>
        </div>
    );
}
