import ClientComponent from './ClientComponent';
import ClientComponent2 from './ClientComponent2';
import { getServiceTotalList } from '@/services/API';

export const metadata = {
    title: 'NextToon | 인기웹툰',
};

const getDataFetch = async (page: number, perPage: number, service: string) => {
    const data = await getServiceTotalList(page, perPage, service);
    return data;
};

export default async function Page({
    params,
}: {
    params: { service: string };
}) {
    const firstdata = await getDataFetch(0, 1500, params.service);
    const seconddata = await getDataFetch(1, 1500, params.service);

    const data = await Promise.all([firstdata, seconddata]);

    return <ClientComponent2 data={data} service={params.service} defaultdepth={300}/>;
}
