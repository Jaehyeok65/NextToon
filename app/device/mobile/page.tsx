import { API } from '@/services/API';
import MainCarousel from '@/components/MainCarousel';
import ErrorComponent from '@/utils/ErrorComponent';

const getEntireDataFetch = async () => {
    try {
        const res = await fetch(`${API}?perPage=100&page=1`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return '에러 발생';
    }
};

const getNaverDataFetch = async () => {
    try {
        const res = await fetch(`${API}?perPage=100&page=1&provider=NAVER`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return '에러 발생';
    }
};

const getKakaoDataFetch = async () => {
    try {
        const res = await fetch(`${API}?perPage=100&page=0&provider=KAKAO`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return '에러 발생';
    }
};

const getKakaoPageDataFetch = async () => {
    try {
        const res = await fetch(
            `${API}?perPage=100&page=1&provider=KAKAO_PAGE`
        );
        if (!res.ok) {
            throw new Error('Something went wrong');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return '에러 발생';
    }
};

const Page = async () => {
    const entire = await getEntireDataFetch();
    const naver = await getNaverDataFetch();
    const kakao = await getKakaoDataFetch();
    const kakaoPage = await getKakaoPageDataFetch();

    const initialdepth = 1;

    if (
        entire === '에러 발생' ||
        naver === '에러 발생' ||
        kakao === '에러 발생' ||
        kakaoPage === '에러 발생'
    ) {
        return <ErrorComponent />;
    }

    return (
        <>
            <MainCarousel
                list={entire?.webtoons}
                title="전체 웹툰"
                address="/list"
                initialdepth={initialdepth}
            />
            <MainCarousel
                list={naver?.webtoons}
                title="네이버 웹툰"
                address="/list/naver"
                initialdepth={initialdepth}
            />
            <MainCarousel
                list={kakao?.webtoons}
                title="카카오 웹툰"
                address="/list/kakao"
                initialdepth={initialdepth}
            />
            <MainCarousel
                list={kakaoPage?.webtoons}
                title="카카오페이지 웹툰"
                address="/list/kakaopage"
                initialdepth={initialdepth}
            />
        </>
    );
};

export default Page;
