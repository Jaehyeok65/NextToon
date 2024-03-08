'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/style/detail.module.css';
import {
    getServiceName,
    getSerialDay,
    AddBookMark,
    CheckBookMark,
} from '@/utils/Bookmark';
import { FaHeart } from 'react-icons/fa6';
import { WebtoonInfo } from '@/types/type';
import { useSearchParams } from 'next/navigation';

export default function ClientComponent({ data }: any) {
    const [webtoon, setWebtoon] = useState<WebtoonInfo>();

    const params = useSearchParams();
    const service = params.get('service');

    useEffect(() => {
        //초기 로딩 시 service에 맞는 데이터 렌더링
        const getWebtoonData = (data: WebtoonInfo[], service: string) => {
            const current = data.filter((item) => item.service === service);
            return current.length > 0 ? current[0] : undefined;
        };

        if (service) {
            setWebtoon(getWebtoonData(data, service));
        }
    }, []);
    const onAddClick = () => {
        if (webtoon) {
            if (CheckBookMark(webtoon)) {
                //이미 북마크에 등록되어 있다면
                window.alert('이미 북마크에 등록된 작품입니다.');
                return;
            } else {
                AddBookMark(webtoon);
            }
        }
    };

    if (webtoon) {
        return (
            <div className={styles.container}>
                <div>
                    <img src={webtoon.img} alt={webtoon.title} />
                </div>
                <div className={styles.textcontainer}>
                    <div>{webtoon.title}</div>
                    <div>{webtoon.author}</div>
                    <div>{getServiceName(webtoon.service)}</div>
                    <div>
                        {webtoon.updateDays && getSerialDay(webtoon.updateDays)}
                    </div>
                    <div>
                        <FaHeart color="red" /> {webtoon.fanCount + '만++'}
                    </div>
                    <button onClick={onAddClick}>북마크 추가하기</button>
                </div>
            </div>
        );
    }
}
