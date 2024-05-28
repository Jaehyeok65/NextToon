'use client';

import { useState, useEffect } from 'react';
import styles from '@/style/card.module.css';
import { WebtoonInfo } from '@/types/type';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import {
    CheckBookMark,
    AddBookMark,
    RemoveBookMark,
    getFanCount,
} from '@/utils/Bookmark';
import { useRouter } from 'next/navigation';
import { getServiceName } from '@/utils/Bookmark';
import { getSerialDay } from '@/utils/Bookmark';

const Card: React.FC<WebtoonInfo> = ({
    img,
    title,
    author,
    service,
    _id,
    setWebtoons,
    updateDays,
    fanCount,
}) => {
    const [isBookMark, setIsBookMark] = useState<boolean>(false); //카드가 북마크에 등록되어 있는지 확인
    const router = useRouter();

    useEffect(() => {
        setIsBookMark(
            CheckBookMark({
                _id,
                title,
                author,
                service,
                img,
                updateDays,
                fanCount,
            })
        );
    }, [img, title, author, service, _id, fanCount, updateDays]); //초기 렌더링시 북마크에 등록되어있는지 확인하는 용도

    const onDetailNavigation = (title: string, service: string) => {
        router.push(`/detail/${title}/${service}`);
    };

    const onAddClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        AddBookMark({
            _id,
            title,
            author,
            service,
            img,
            updateDays,
            fanCount,
        });
        setIsBookMark((prev) => !prev);
    };

    const onRemoveClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        RemoveBookMark(
            {
                _id,
                title,
                author,
                service,
                img,
                fanCount,
                updateDays,
            },
            setWebtoons
        );
        setIsBookMark((prev) => !prev);
    };

    return (
        <div
            className={styles.card}
            onClick={() => onDetailNavigation(title, service)}
        >
            <img src={img} alt={title} loading="lazy" />
            <div className={styles.textoverlay}>
                <div>
                    {isBookMark ? (
                        <FaHeart
                            size={'30px'}
                            onClick={onRemoveClick}
                            data-testid="RedHeart"
                        />
                    ) : (
                        <FaRegHeart
                            size={'30px'}
                            onClick={onAddClick}
                            data-testid="EmptyHeart"
                        />
                    )}
                </div>
                <div>{updateDays && getSerialDay(updateDays)}</div>
                <h4>{title}</h4>
                <div>{author}</div>
                <div>{getServiceName(service)}</div>
                <div>{fanCount && getFanCount(fanCount)}</div>
            </div>
        </div>
    );
};

export default Card;
