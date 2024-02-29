import { API } from '@/services/API';
import styles from '@/style/detail.module.css'
import { getServiceName } from '@/utils/Bookmark';
import { CheckBookMark } from '@/utils/Bookmark';

async function getWebtoonTitle(title: string) {
    const res = await fetch(`${API}/search?keyword=${title}`);
    return res.json();
}

export default async function Detail({
    params,
}: {
    params: { title: string };
}) {
    const data = await getWebtoonTitle(params.title);
    console.log(data?.webtoons[0]);
    return <div className={styles.container}>
        <div>
        <img src={data?.webtoons[0].img} alt={data?.webtoons[0].title} />
        </div>
        <div className={styles.textcontainer}>
            <div>
                {data?.webtoons[0].title}
            </div>
            <div>
                {data?.webtoons[0].author}
            </div>
            <div>
                {getServiceName(data?.webtoons[0].service)}
            </div>
        </div>
    </div>
}
