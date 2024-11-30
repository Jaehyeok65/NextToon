import { useState } from 'react';
import { CardInfo } from '@/types/type';

const day: any = {
    0: '일요웹툰',
    1: '월요웹툰',
    2: '화요웹툰',
    3: '수요웹툰',
    4: '목요웹툰',
    5: '금요웹툰',
    6: '토요웹툰',
};

const SelectedCategory = [
    '전체보기',
    '월요웹툰',
    '화요웹툰',
    '수요웹툰',
    '목요웹툰',
    '금요웹툰',
    '토요웹툰',
    '일요웹툰',
    '완결',
    '정보없음',
];

export const useBookmarkCategory = () => {
    const [category, setCategory] = useState<string>(day[new Date().getDay()]);

    const setCategoryWebtoons = (
        //요일별로 정렬
        webtoons: CardInfo[],
        category: string
    ): CardInfo[] => {
        const filters: { [key: string]: (item: CardInfo) => boolean } = {
            전체보기: () => true,
            정보없음: (item) =>
                item?.isEnd === false && item?.updateDays?.length === 0,
            완결: (item) => item.isEnd === true,
            월요웹툰: (item) => item?.updateDays?.includes('MON'),
            화요웹툰: (item) => item?.updateDays?.includes('TUE'),
            수요웹툰: (item) => item?.updateDays?.includes('WED'),
            목요웹툰: (item) => item?.updateDays?.includes('THU'),
            금요웹툰: (item) => item?.updateDays?.includes('FRI'),
            토요웹툰: (item) => item?.updateDays?.includes('SAT'),
            일요웹툰: (item) => item?.updateDays?.includes('SUN'),
        };

        const filterFunction = filters[category];
        return filterFunction ? webtoons?.filter(filterFunction) : [];
    };

    return { category, setCategory, setCategoryWebtoons, SelectedCategory };
};