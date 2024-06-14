import ClientComponent2 from './ClientComponent2';
import { getTotalList } from '@/services/API';

export const metadata = {
    title: 'NextToon | 완결',
};

const getDataFetch = async (page: number, perPage: number) => {
    const data = await getTotalList(page, perPage);
    return data;
};

export default async function Page() {
    const firstdata = await getDataFetch(0, 3000);
    const seconddata = await getDataFetch(1, 3000);
    const thirddata = await getDataFetch(2, 3000);

    const data = await Promise.all([firstdata, seconddata, thirddata]);

    return <ClientComponent2 data={data} />;
}
