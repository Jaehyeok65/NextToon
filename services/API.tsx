// 환경 변수에서 API 주소 가져오기
export const API = process.env.NEXT_PUBLIC_API;

const CategoryToEng: any = {
    월요웹툰: 'MON',
    화요웹툰: 'TUE',
    수요웹툰: 'WED',
    목요웹툰: 'THU',
    금요웹툰: 'FRI',
    토요웹툰: 'SAT',
    일요웹툰: 'SUN',
};

export const getWebtoonList = async (page: number, updateDays?: string) => {
    if (updateDays) {
        updateDays = CategoryToEng[updateDays];
    }
    try {
        const res = updateDays
            ? await fetch(
                  `${API}?perPage=12&page=${page}&updateDay=${updateDays}`,
                  {
                      method: 'get',
                  }
              )
            : await fetch(`${API}?perPage=12&page=${page}`, {
                  method: 'get',
              });

        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getServiceWebtoonList = async (
    page: number,
    provider: string,
    updateDays?: string
) => {
    if (updateDays) {
        updateDays = CategoryToEng[updateDays];
    }
    try {
        const res = updateDays
            ? await fetch(
                  `${API}?perPage=12&page=${page}&provider=${provider}&updateDay=${updateDays}`
              )
            : await fetch(
                  `${API}?perPage=12&page=${page}&provider=${provider}`
              );

        if (!res.ok) {
            throw new Error('Something went wrong');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getTotalList = async (page: number, perPage: number) => {
    try {
        const res = await fetch(`${API}?perPage=${perPage}&page=${page}`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getServiceTotalList = async (
    page: number,
    perPage: number,
    service: string
) => {
    try {
        const res = await fetch(
            `${API}?perPage=${perPage}&page=${page}&provider=${service}`
        );
        if (!res.ok) {
            throw new Error('Something went wrong');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};
