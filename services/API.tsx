export const API = 'https://korea-webtoon-api.herokuapp.com';

export const getWebtoonList = async (page: number) => {
    const res = await fetch(`${API}/?perPage=12&page=${page}`);
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
