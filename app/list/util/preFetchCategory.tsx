import moment from 'moment-timezone';

const day: any = {
    0: '일요웹툰',
    1: '월요웹툰',
    2: '화요웹툰',
    3: '수요웹툰',
    4: '목요웹툰',
    5: '금요웹툰',
    6: '토요웹툰',
};

export const preFetchCategory = () => {
    const category = day[moment.tz('Asia/Seoul').day()];
    return category;
}