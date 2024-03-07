import { API } from '@/services/API';
import styles from '@/style/detail.module.css';
import { getServiceName, getSerialDay } from '@/utils/Bookmark';
import { FaHeart } from 'react-icons/fa6';

async function getWebtoonTitle(title: string) {
    const res = await fetch(`${API}/search?keyword=${title}`);
    return res.json();
}

export const metadata = {
    title : "NextToon | 상세보기",
}

export default async function Detail({
    params,
}: {
    params: { title: string };
}) {
    const data = await getWebtoonTitle(params.title);
    return (
        <div className={styles.container}>
            <div>
                <img
                    src={data?.webtoons[0]?.img}
                    alt={data?.webtoons[0]?.title}
                />
            </div>
            <div className={styles.textcontainer}>
                <div>{data?.webtoons[0]?.title}</div>
                <div>{data?.webtoons[0]?.author}</div>
                <div>{getServiceName(data?.webtoons[0]?.service)}</div>
                <div>{getSerialDay(data?.webtoons[0]?.updateDays)}</div>
                <div><FaHeart color='red' /> {data?.webtoons[0]?.fanCount+"만++"}</div>
            </div>
        </div>
    );
}
