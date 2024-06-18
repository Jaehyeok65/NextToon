import ClientComponent2 from './ClientComponent2';
import { getServiceTotalList } from '@/services/API';
import ErrorComponent from '@/utils/ErrorComponent';

export const metadata = {
    title: 'NextToon | 인기웹툰',
};

const getDataFetch = async (page: number, perPage: number, service: string) => {
    try {
        const data = await getServiceTotalList(page, perPage, service);
        return data;
    } catch (error) {
        return '에러 발생';
    }
};

export default async function Page({
    params,
}: {
    params: { service: string };
}) {
    const firstdata = await getDataFetch(0, 1500, params.service);
    const seconddata = await getDataFetch(1, 1500, params.service);

    const data = await Promise.all([firstdata, seconddata]);

    if (data.includes('에러 발생')) {
        return <ErrorComponent />;
    }

    return (
        <ClientComponent2
            data={data}
            service={params.service}
            defaultdepth={300}
        />
    );
}
