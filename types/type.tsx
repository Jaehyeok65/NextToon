export interface WebtoonInfo {
    id: string;
    thumbnail : string[];
    title: string;
    authors: string[];
    provider: string;
    setWebtoons?: any;
    updateDays: string[];
    fanCount?: number | null;
    kakaopage?:boolean;
    url?:string;
    isEnd : boolean;
}
