// 환경 변수에서 API 주소 가져오기
export const API = process.env.NEXT_PUBLIC_API;

export const getWebtoonList = async (page: number) => {
    try {
        const res = await fetch(`${API}/?perPage=12&page=${page}`, {
            method: 'get',
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message + 'Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getServiceWebtoonList = async (page: number, service: string) => {
    try {
        const res = await fetch(
            `${API}/?perPage=12&page=${page}&service=${service}`
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message + 'Something went wrong');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getTotalList = async (page: number, perPage: number) => {
    try {
        const res = await fetch(`${API}/?perPage=${perPage}&page=${page}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message + 'Something went wrong');
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
            `${API}/?perPage=${perPage}&page=${page}&service=${service}`
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message + 'Something went wrong');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};
