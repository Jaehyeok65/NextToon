// 환경 변수에서 API 주소 가져오기
export const API = process.env.NEXT_PUBLIC_API;

export const getWebtoonList = async (page: number) => {
    const res = await fetch(`${API}/?perPage=12&page=${page}`, {
        method: 'get',
    });
    const data = await res.json();
    return data;
};

export const getServiceWebtoonList = async (page: number, service: string) => {
    const res = await fetch(
        `${API}/?perPage=12&page=${page}&service=${service}`
    );
    const data = await res.json();
    return data;
};

export const getTotalList = async (page: number, perPage: number) => {
    const res = await fetch(`${API}/?perPage=${perPage}&page=${page}`);
    const data = await res.json();
    return data;
};

export const getServiceTotalList = async (
    page: number,
    perPage: number,
    service: string
) => {
    const res = await fetch(
        `${API}/?perPage=${perPage}&page=${page}&service=${service}`
    );
    const data = await res.json();
    return data;
};
