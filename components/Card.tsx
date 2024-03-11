'use client';

import { useState, useEffect } from 'react';
import styles from '@/style/card.module.css';
import { WebtoonInfo } from '@/types/type';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import { CheckBookMark, AddBookMark, RemoveBookMark } from '@/utils/Bookmark';
import { useRouter } from 'next/navigation';
import { getServiceName } from '@/utils/Bookmark';
import { getSerialDay } from '@/utils/Bookmark';
import Image from 'next/image';

const Card: React.FC<WebtoonInfo> = ({
    img,
    title,
    author,
    service,
    _id,
    setWebtoons,
    updateDays,
    fanCount,
    kakaopage
}) => {
    const [isBookMark, setIsBookMark] = useState<boolean>(false); //카드가 북마크에 등록되어 있는지 확인
    const router = useRouter();

    if(kakaopage) {
        img = 'https:' + img;
    }

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
    }, []); //초기 렌더링시 북마크에 등록되어있는지 확인하는 용도

    const onDetailNavigation = (title: string, service : string) => {
        router.push(`/detail/${title}?service=${service}`);
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
            },
            setWebtoons
        );
        setIsBookMark((prev) => !prev);
    };

    console.log(img);



    return (
        <div className={styles.card} onClick={() => onDetailNavigation(title,service)}>
            <Image src={img} alt={title}  width={300} height={200}/>
            <div className={styles.textoverlay}>
                <div>
                    {isBookMark ? (
                        <FaHeart size={'30px'} onClick={onRemoveClick} />
                    ) : (
                        <FaRegHeart size={'30px'} onClick={onAddClick} />
                    )}
                </div>
                <div>{updateDays && getSerialDay(updateDays)}</div>
                <h4>{title}</h4>
                <div>{author}</div>
                <div>{getServiceName(service)}</div>
                <div>{fanCount && fanCount + '만++'}</div>
            </div>
        </div>
    );
};

export default Card;
