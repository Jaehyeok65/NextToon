import { API } from '@/services/API';
import ClientComponent from './ClientComponent';
import { WebtoonInfo } from '@/types/type';

async function getWebtoonTitle(title: string) {
    const res = await fetch(`${API}/search?keyword=${title}`);
    return res.json();
}

const getWebtoonData = (data: WebtoonInfo[], service: string) => {
    const current = data?.filter((item) => item.service === service);
    return current?.length > 0 ? current[0] : undefined;
};

export const metadata = {
    title: 'NextToon | 상세보기',
};

export default async function Detail({
    params,
}: {
    params: { title: string[] };
}) {
    const prev = await getWebtoonTitle(params.title[0]);
    const next = getWebtoonData(prev.webtoons, params.title[1]);
    return <ClientComponent data={next} />;
}
