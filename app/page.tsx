
import { API } from '@/services/API';
import MainCarousel from '@/components/MainCarousel';

const getEntireDataFetch = async() => {
    const res = await fetch(`${API}/?perPage=100&page=0`);
    const data = await res.json();
    return data;
}

const getNaverDataFetch = async() => {
    const res = await fetch(`${API}/?perPage=100&page=0&service=naver`);
    const data = await res.json();
    return data;
}

const getKakaoDataFetch = async() => {
    const res = await fetch(`${API}/?perPage=100&page=0&service=kakao`);
    const data = await res.json();
    return data;
}

const getKakaoPageDataFetch = async() => {
    const res = await fetch(`${API}/?perPage=100&page=0&service=kakaoPage`);
    const data = await res.json();
    return data;
}

const Page = async() => {

    const entire = await getEntireDataFetch();
    const naver = await getNaverDataFetch();
    const kakao = await getKakaoDataFetch();
    const kakaoPage = await getKakaoPageDataFetch();

    return(
        <>
        <MainCarousel list={entire?.webtoons} title='전체 웹툰' address='/list' />
        <MainCarousel list={naver?.webtoons} title='네이버 웹툰' address='/list/naver' />
        <MainCarousel list={kakao?.webtoons} title='카카오 웹툰' address='/list/kakao' />
        <MainCarousel list={kakaoPage?.webtoons} title='카카오페이지 웹툰' address='/list/kakaopage' />
        </>        
    )
}


export default Page;