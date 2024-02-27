'use client';

import { useState, useEffect } from 'react';
import styles from '@/style/card.module.css';
import { WebtoonInfo } from '@/types/type';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import { CheckBookMark, AddBookMark, RemoveBookMark } from '@/utils/Bookmark';
import { useRouter } from 'next/navigation';

const Card: React.FC<WebtoonInfo> = ({ img, title, author, service, _id }) => {
    const [isBookMark, setIsBookMark] = useState<boolean>(false); //카드가 북마크에 등록되어 있는지 확인

    useEffect(() => {
        setIsBookMark(
            CheckBookMark({
                _id,
                title,
                author,
                service,
                img,
            })
        );
    }, []); //초기 렌더링시 북마크에 등록되어있는지 확인하는 용도

    const getServiceName = (service: string) => {
        switch (service) {
            case 'naver':
                return '네이버 웹툰';
                break;
            case 'kakao':
                return '카카오 웹툰';
                break;
            case 'kakaoPage':
                return '카카오페이지 웹툰';
                break;
        }
    };

    const onAddClick = () => {
        AddBookMark({
            _id,
            title,
            author,
            service,
            img,
        });
        setIsBookMark((prev) => !prev);
    };

    const onRemoveClick = () => {
        RemoveBookMark({
            _id,
            title,
            author,
            service,
            img,
        });
        setIsBookMark((prev) => !prev);
    };

    return (
        <div className={styles.card}>
            <img src={img} alt={title} />
            <div className={styles.textoverlay}>
                <div>
                    {isBookMark ? (
                        <FaHeart size={'30px'} onClick={onRemoveClick} />
                    ) : (
                        <FaRegHeart size={'30px'} onClick={onAddClick} />
                    )}
                </div>
                <h4>{title}</h4>
                <div>{author}</div>
                <div>{getServiceName(service)}</div>
            </div>
        </div>
    );
};

export default Card;
