import { API } from '@/services/API';
import ClientComponent from './ClientComponent';

async function getWebtoonTitle(title: string) {
    const res = await fetch(`${API}/search?keyword=${title}`);
    return res.json();
}

export const metadata = {
    title: 'NextToon | 상세보기',
};

export default async function Detail({
    params,
}: {
    params: { title: string };
}) {
    const data = await getWebtoonTitle(params.title);
    return (
        <ClientComponent
            title={data?.webtoons[0]?.title}
            author={data?.webtoons[0]?.author}
            service={data?.webtoons[0]?.service}
            img={data?.webtoons[0]?.img}
            updateDays={data?.webtoons[0]?.updateDays}
            fanCount={data?.webtoons[0]?.fanCount}
            _id={data?.webtoons[0]?._id}
        />
    );
}
