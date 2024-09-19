'use client';

import { useState, useEffect } from 'react';
import styles from '@/style/card.module.css';
import { CardInfo } from '@/types/type';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import {
    CheckBookMark,
    AddBookMark,
    RemoveBookMark,
    getFanCount,
    getAuthors,
} from '@/utils/Bookmark';
import { useRouter } from 'next/navigation';
import { getServiceName } from '@/utils/Bookmark';
import { getSerialDay } from '@/utils/Bookmark';

const Card: React.FC<CardInfo> = ({
    thumbnail,
    title,
    authors,
    provider,
    id,
    setWebtoons,
    updateDays,
    fanCount,
    isEnd,
    isUpdated,
    category,
    setCategoryWebtoons,
}) => {
    const [isBookMark, setIsBookMark] = useState<boolean>(false); //카드가 북마크에 등록되어 있는지 확인
    const router = useRouter();

    useEffect(() => {
        setIsBookMark(
            CheckBookMark({
                id,
                title,
                authors,
                provider,
                thumbnail,
                updateDays,
                fanCount,
                isEnd,
            })
        );
    }, [thumbnail, title, authors, provider, id, fanCount, updateDays, isEnd]); //초기 렌더링시 북마크에 등록되어있는지 확인하는 용도

    const onDetailNavigation = (title: string, service: string) => {
        router.push(`/detail/${title}/${service}`);
    };

    const onAddClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        AddBookMark({
            id,
            title,
            authors,
            provider,
            thumbnail,
            updateDays,
            fanCount,
            isEnd,
            isUpdated,
        });
        setIsBookMark((prev) => !prev);
    };

    const onRemoveClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        RemoveBookMark(
            {
                id,
                title,
                authors,
                provider,
                thumbnail,
                fanCount,
                updateDays,
                isEnd,
                isUpdated,
            },
            setWebtoons,
            setCategoryWebtoons,
            category
        );
        setIsBookMark((prev) => !prev);
    };

    return (
        <div
            className={styles.card}
            onClick={() => onDetailNavigation(title, provider)}
        >
            <img src={thumbnail[0]} alt={title} />
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
                <div>{updateDays && getSerialDay(updateDays, isEnd)}</div>
                <h4>{title}</h4>
                <div>{getAuthors(authors)}</div>
                <div>{getServiceName(provider)}</div>
                <div>{fanCount && getFanCount(fanCount)}</div>
            </div>
            {isUpdated && <div className={styles.update}>UP</div>}
        </div>
    );
};

export default Card;
