import { WebtoonInfo } from '@/types/type';

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

export const RemoveBookMark = (webtoon: WebtoonInfo, setWebtoons?: any) => {
    //북마크에서 제거함
    const prev = window.localStorage.getItem('bookmark');
    if (prev) {
        const current: any[] = JSON.parse(prev);
        const next = current.filter((item) => item.id !== webtoon.id);
        if (setWebtoons) {
            setWebtoons(next);
        }
        window.localStorage.setItem('bookmark', JSON.stringify(next));
        window.alert('북마크에서 제거되었습니다.');
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
