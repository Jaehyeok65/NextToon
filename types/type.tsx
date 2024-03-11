export interface WebtoonInfo {
    _id: string;
    img: string;
    title: string;
    author: string;
    service: string;
    setWebtoons?: any;
    updateDays?: string[];
    fanCount?: number | null;
    kakaopage?:boolean;
}
