import { API } from '@/services/API';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';

export const metadata = {
    title: 'NextToon | 검색결과',
};

async function getWebtoonTitle(title: string) {
    const res = await fetch(`${API}/search?keyword=${title}`);
    return res.json();
}

export default async function Page({ params }: { params: { title: string } }) {
    const data = await getWebtoonTitle(params.title);

    if (data?.webtoons.length === 0) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>
                    {'"' + decodeURI(params.title) + '"'} 검색된 작품이
                    없습니다.
                </h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {data?.webtoons.map((webtoon: WebtoonInfo) => (
                    <Card
                        key={webtoon._id}
                        _id={webtoon._id}
                        img={webtoon.img}
                        title={webtoon.title}
                        author={webtoon.author}
                        service={webtoon.service}
                        updateDays={webtoon.updateDays}
                        fanCount={webtoon.fanCount}
                    />
                ))}
            </div>
        </div>
    );
}
