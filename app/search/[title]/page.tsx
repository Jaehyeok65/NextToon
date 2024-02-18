import { API } from '@/services/API';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';

async function getWebtoonTitle(title: string) {
    const res = await fetch(`${API}/search?keyword=${title}`);
    return res.json();
}

export default async function Page({ params }: { params: { title: string } }) {
    const data = await getWebtoonTitle(params.title);

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {data?.webtoons.map((webtoon: WebtoonInfo) => (
                    <Card
                        key={webtoon._id}
                        img={webtoon.img}
                        title={webtoon.title}
                        author={webtoon.author}
                        service={webtoon.service}
                    />
                ))}
            </div>
        </div>
    );
}
