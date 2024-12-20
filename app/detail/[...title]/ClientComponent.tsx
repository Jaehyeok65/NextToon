'use client';

import React from 'react';
import styles from '@/style/detail.module.css';
import { getServiceName, getSerialDay, AddBookMark } from '@/utils/Bookmark';
import { FaHeart } from 'react-icons/fa6';
import { WebtoonInfo } from '@/types/type';
import Link from 'next/link';

export default function ClientComponent({
    data,
}: {
    data: WebtoonInfo | undefined;
}) {
    const onAddClick = () => {
        if (data) {
            AddBookMark(data);
        }
    };

    if (data === undefined) {
        return <div>데이터가 올바르지 않습니다.</div>;
    }

    return (
        <div className={styles.container}>
            <div>
                <img src={data?.thumbnail[0]} alt={data?.title} />
            </div>
            <div className={styles.textcontainer}>
                <div>{data?.title}</div>
                <div>{data?.authors[0]}</div>
                <div>{data && getServiceName(data.provider)}</div>
                <div>
                    {data?.updateDays &&
                        getSerialDay(data.updateDays, data?.isEnd)}
                </div>
                <div>
                    {data?.url && (
                        <Link href={data?.url} target="_blank">
                            바로가기
                        </Link>
                    )}
                </div>
                <button onClick={onAddClick}>북마크 추가하기</button>
            </div>
        </div>
    );
}
