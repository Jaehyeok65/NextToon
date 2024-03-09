'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/style/list.module.css';
import { useRouter } from 'next/navigation';

const flatform: any = {
    선택: null,
    카카오: 'kakao',
    네이버: 'naver',
    카카오페이지: 'kakaoPage',
};

export default function Client2() {
    const [service, setService] = useState<string>();
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`/sortedlist/${flatform[event.target.value]}`);
    };

    if (!service) {
        return (
            <div className={styles.background}>
                <div className={styles.searchcontent}>
                    <label id="selectoption">
                        플랫폼을 선택해주세요 :&nbsp;
                    </label>
                    <select
                        id="selectoption"
                        value={service}
                        onChange={handleChange}
                        className={styles.selectbox}
                    >
                        {Object.keys(flatform).map(
                            (item: any, index: number) => (
                                <option key={index}>{item}</option>
                            )
                        )}
                    </select>
                </div>
            </div>
        );
    }
}
