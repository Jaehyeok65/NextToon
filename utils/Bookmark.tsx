import { WebtoonInfo } from '@/types/type';
import { API } from '@/services/API';

export const CheckBookMark = (webtoon: WebtoonInfo): boolean => {
    //북마크에 등록되어있는지 확인함
    const prev = window.localStorage.getItem('bookmark');
    if (prev) {
        //null이 아닐 경우 BookMark가 있다는 뜻
        const current: any[] = JSON.parse(prev);
        const number = current.findIndex((item) => item.id === webtoon.id); //_id가 있는지 확인
        if (number > -1) {
            //-1보다 크다면 북마크에 등록되어 있다는 것
            return true;
        } else {
            return false;
        }
    }
    return false; //prev가 없다면 북마크 자체가 없다는 뜻이므로 false리턴
};

export const AddBookMark = (webtoon: WebtoonInfo) => {
    //북마크에 등록함
    if (CheckBookMark(webtoon)) {
        //이미 북마크에 등록되어 있을 경우
        window.alert('이미 북마크에 등록된 작품입니다.');
        return;
    }
    const prev = window.localStorage.getItem('bookmark'); //이전에 있던 북마크를 가져옴
    //이전에 북마크가 있는 것과 없는 것을 분기해서 처리
    if (prev) {
        //북마크가 이미 등록되어 있다면
        const current = JSON.parse(prev); //JSON으로 처리된 것을 parse해서 current에 대입
        const next = [webtoon, ...current];
        /*const nextArray = next.sort(
            (a: any, b: any) => b.fanCount - a.fanCount
        );*/

        window.localStorage.setItem('bookmark', JSON.stringify(next));
        window.alert('북마크에 등록되었습니다.');
    } else {
        //북마크가 등록되어 있지 않다면 맨 초기 북마크 등록
        const current = JSON.stringify([webtoon]); //로컬스토리지에 등록하기 위함
        window.localStorage.setItem('bookmark', current);
        window.alert('북마크에 등록되었습니다.');
    }
};

export const RemoveBookMark = (
    webtoon: WebtoonInfo,
    setWebtoons?: any,
    setCategoryWebtoons?: any,
    category?: string
) => {
    //북마크에서 제거함
    const prev = window.localStorage.getItem('bookmark');
    if (prev) {
        const current: any[] = JSON.parse(prev);
        const next = current.filter((item) => item.id !== webtoon.id);
        if (setWebtoons && category && setCategoryWebtoons) {
            setWebtoons(setCategoryWebtoons(next, category));
        }
        window.localStorage.setItem('bookmark', JSON.stringify(next));
        window.alert('북마크에서 제거되었습니다.');
    }
};

export const onResetBookmark = () => {
    const prev = localStorage.getItem('bookmark');

    if (prev) {
        const current = JSON.parse(prev); //파싱
        if (Array.isArray(current) && current.length > 0) {
            //배열이며 길이가 0이상이라면
            const propertyCheck = current.every(
                //모든 조건을 만족해야만 true를 반환 즉 하나라도 만족하지 못한다면 false 반환
                (item: any) =>
                    item.id &&
                    item.authors &&
                    item.provider &&
                    item.title &&
                    item.updateDays &&
                    item.thumbnail &&
                    item.isEnd !== undefined &&
                    item.isEnd !== null &&
                    item.isUpdated !== undefined &&
                    item.isUpdated !== null
            );

            if (!propertyCheck) {
                // 속성을 만족하지 못함
                const newArray = current.filter(
                    //유효한 속성을 가진 함수들만 필터링
                    (item: any) =>
                        item.id &&
                        item.authors &&
                        item.provider &&
                        item.title &&
                        item.updateDays &&
                        item.thumbnail &&
                        item.isEnd !== undefined &&
                        item.isEnd !== null &&
                        item.isUpdated !== undefined &&
                        item.isUpdated !== null
                );

                localStorage.setItem('bookmark', JSON.stringify(newArray));
            }
        }
    }
};

export const getServiceName = (service: string) => {
    switch (service) {
        case 'NAVER':
            return '네이버 웹툰';
            break;
        case 'KAKAO':
            return '카카오 웹툰';
            break;
        case 'KAKAO_PAGE':
            return '카카오페이지 웹툰';
            break;
    }
};

export const getSerialDay = (updateDays: string[], isEnd: boolean) => {
    if (isEnd) {
        return <div>완결</div>;
    }

    if (updateDays.length === 0) {
        return;
    }

    const converter: any = {
        MON: '월',
        TUE: '화',
        WED: '수',
        THU: '목',
        FRI: '금',
        SAT: '토',
        SUN: '일',
    };

    return (
        <div>
            {updateDays.map((item: string, index: number) =>
                index < updateDays.length - 1 ? (
                    <span key={index}>{converter[item]},</span>
                ) : (
                    <span key={index}>{converter[item]}</span>
                )
            )}
            &nbsp;연재
        </div>
    );
};

export const getAuthors = (authors: string[]) => {
    return (
        <div>
            {authors.map((author: string, index: number) => (
                <span key={index}>
                    {index + 1 === authors.length ? author : author + ', '}
                </span>
            ))}
        </div>
    );
};

export const getFanCount = (fanCount: number) => {
    if (fanCount > 10000) {
        return (
            Math.floor(fanCount / 10000) + '억 ' + (fanCount % 10000) + '만++'
        );
    } else if (fanCount === 10000) {
        return Math.floor(fanCount / 10000) + '억++';
    } else {
        return fanCount + '만++';
    }
};

async function getWebtoonTitle(title: string) {
    try {
        const res = await fetch(`${API}?keyword=${title}`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }
        return res.json();
    } catch (error) {
        return '에러 발생';
    }
}

export const getBookMarkDataUpdate = async (list: WebtoonInfo[]) => {
    const newList = await Promise.all(
        list?.map(async (item: WebtoonInfo) => {
            const data = await getWebtoonTitle(item.title);
            return data;
        })
    );

    const updatedList = list.map((item: WebtoonInfo) => {
        return {
            ...item,
            isUpdated: getisUpdateCheck(item, newList),
        };
    });

    return updatedList;
};

export const getisUpdateCheck = (target: WebtoonInfo, newList: any[]) => {
    const data = newList.map((item) => item.webtoons).flat();
    const newdata = data.filter(
        (item: any) =>
            item.title === target.title && item.provider === target.provider
    );
    return newdata[0]?.isUpdated;
};
