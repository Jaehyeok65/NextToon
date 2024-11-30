import { useState, useEffect, useRef } from 'react';
import { CardInfo } from '@/types/type';
import { useBookmarkCategory } from './useBookmarkCategory';
import { getBookMarkDataUpdate } from '@/utils/Bookmark';

interface useBookmarkWebtoonsProps {
    category: string;
    setCategoryWebtoons: (
        newWebtoons: CardInfo[],
        category: string
    ) => CardInfo[];
}

export const useBookmarkWebtoons = ({
    category,
    setCategoryWebtoons,
}: useBookmarkWebtoonsProps) => {
    const [webtoons, setWebtoons] = useState<CardInfo[]>();
    const initialWebtoons = useRef<CardInfo[]>([]); // 초기 전체 웹툰 목록을 저장

    useEffect(() => {
        const fetchData = async () => {
            const prev = window.localStorage.getItem('bookmark');
            let parsedData = [];

            if (prev) {
                // prev가 null이 아니라는 것은 데이터가 있다는 것
                parsedData = JSON.parse(prev);
                initialWebtoons.current = parsedData; // 초기 데이터 저장
            } else {
                // prev가 null이라면 빈 배열로 처리
                initialWebtoons.current = []; // 초기 데이터 저장
            }

            // 서버에서 최신 데이터 가져오기
            if (initialWebtoons.current?.length > 0) {
                const newWebtoons = await getBookMarkDataUpdate(
                    initialWebtoons.current
                );
                setWebtoons(setCategoryWebtoons(newWebtoons, category));
            } else {
                setWebtoons([]); // 데이터가 없는 경우 빈 배열 설정
            }
        };

        fetchData();
    }, [category, setCategoryWebtoons]);

    return { webtoons, setWebtoons };
};
