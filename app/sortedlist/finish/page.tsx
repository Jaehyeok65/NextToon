import ErrorComponent from '@/utils/ErrorComponent';
import ClientComponent2 from './ClientComponent2';
import { getTotalList } from '@/services/API';

export const metadata = {
    title: 'NextToon | 완결',
};

const getDataFetch = async (page: number, perPage: number) => {
    try {
        const data = await getTotalList(page, perPage);
        return data;
    } catch (error) {
        return '에러 발생';
    }
};

export default async function Page() {
    const firstdata = await getDataFetch(1, 100);
    const seconddata = await getDataFetch(2, 100);
    const thirddata = await getDataFetch(3, 100);

    const data = await Promise.all([firstdata, seconddata, thirddata]);

    if (data.includes('에러 발생')) {
        return <ErrorComponent />;
    }

    return <ClientComponent2 data={data} defaultdepth={1000} />;
}
