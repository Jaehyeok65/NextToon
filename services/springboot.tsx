import axios from 'axios';


export const API = 'http://localhost:8088';


export const SubmitList = async () => {
    const data = await axios.post(`${API}/list`);

    //await sleep(500); //부드러운 화면 전환을 위해 0.5초 쉬었다가 데이터 반환
    return data.data;
};

export const SubmitPage = async (page : any) => {
    const title = '조회순';

    let data;
    if (title === '조회순') {
        data = await axios.post(`${API}/pagebyview`, {
            pg: page,
            sz: 12,
        });
    } else if (title === '별점순') {
        data = await axios.post(`${API}/pagebyrate`, {
            pg: page,
            sz: 12,
        });
    } else if (title === '좋아요순') {
        data = await axios.post(`${API}/pagebylikes`, {
            pg: page,
            sz: 12,
        });
    }

    //await sleep(500); //부드러운 화면 전환을 위해 0.5초 쉬었다가 데이터 반환
    return data?.data;
};
