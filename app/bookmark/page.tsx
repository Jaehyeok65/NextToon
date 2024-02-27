'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';

export default function Page() {
    const [webtoons, setWebtoons] = useState<WebtoonInfo[]>([]);

    useEffect(() => {
        const prev = window.localStorage.getItem('bookmark');
        if (prev) {
            //prev가 null이 아니라는 것은 데이터가 있다는 것
            setWebtoons(JSON.parse(prev));
        }
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {webtoons.length > 0 ? (
                    webtoons.map((webtoon: WebtoonInfo) => (
                        <Card
                            key={webtoon._id}
                            _id={webtoon._id}
                            img={webtoon.img}
                            title={webtoon.title}
                            author={webtoon.author}
                            service={webtoon.service}
                            setWebtoons={setWebtoons}
                        />
                    ))
                ) : (
                    <h2 style={{ color: 'white' }}>
                        북마크에 등록된 작품이 없습니다.
                    </h2>
                )}
            </div>
        </div>
    );
}
