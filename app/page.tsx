import { API } from '@/services/API';
import MainCarousel from '@/components/MainCarousel';

const getEntireDataFetch = async () => {
    try {
        const res = await fetch(`${API}/?perPage=100&page=0`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getNaverDataFetch = async () => {
    try {
        const res = await fetch(`${API}/?perPage=100&page=0&service=naver`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getKakaoDataFetch = async () => {
    try {
        const res = await fetch(`${API}/?perPage=100&page=0&service=kakao`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getKakaoPageDataFetch = async () => {
    try {
        const res = await fetch(`${API}/?perPage=100&page=0&service=kakaoPage`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const Page = async () => {
    const entire = await getEntireDataFetch();
    const naver = await getNaverDataFetch();
    const kakao = await getKakaoDataFetch();
    const kakaoPage = await getKakaoPageDataFetch();

    return (
        <>
            <MainCarousel
                list={entire?.webtoons}
                title="전체 웹툰"
                address="/list"
            />
            <MainCarousel
                list={naver?.webtoons}
                title="네이버 웹툰"
                address="/list/naver"
            />
            <MainCarousel
                list={kakao?.webtoons}
                title="카카오 웹툰"
                address="/list/kakao"
            />
            <MainCarousel
                list={kakaoPage?.webtoons}
                title="카카오페이지 웹툰"
                address="/list/kakaopage"
            />
        </>
    );
};

export default Page;
