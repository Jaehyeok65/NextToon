export interface WebtoonInfo {
    id: string;
    thumbnail: string[];
    title: string;
    authors: string[];
    provider: string;
    updateDays: string[];
    fanCount?: number | null;
    kakaopage?: boolean;
    url?: string;
    isEnd: boolean;
    isUpdated?: boolean;
}

export interface CardInfo extends WebtoonInfo { //기존 타입과 충돌이 있을 수 있으므로 옵셔널로 구성
    setWebtoons?: any; //setState
    setCategoryWebtoons?: any; //카테고리 정렬 기능
    category?: string; //카테고리
}
