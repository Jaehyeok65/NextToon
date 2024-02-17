const API = 'https://korea-webtoon-api.herokuapp.com';

export const getWebtoonList = async (page: number) => {
    const res = await fetch(`${API}/?perPage=12&page=${page}`);
    const data = await res.json();
    return data;
};
