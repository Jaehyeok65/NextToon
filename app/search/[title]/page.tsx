import { API } from '@/services/API';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import ErrorComponent from '@/utils/ErrorComponent';

async function getWebtoonTitle(title: string) {
    try {
        const res = await fetch(`${API}?keyword=${title}`);
        if (!res.ok) {
            throw new Error('Something went wrong');
        }
        return res.json();
    } catch (error) {
        return '에러 발생';
    }
}

export default async function Page({ params }: { params: { title: string } }) {
    const data = await getWebtoonTitle(params.title);

    if (data === '에러 발생') {
        return <ErrorComponent />;
    }

    if (data?.webtoons.length === 0) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>
                    <span>{'"' + decodeURI(params.title) + '"'}</span>{' '}
                    <span>검색된 작품이 없습니다.</span>
                </h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <h2 className={styles.searchcontent}>
                <span>{'"' + decodeURI(params.title) + '"'}</span> 검색 결과{' '}
                {data?.webtoons.length}개
            </h2>
            <div className={styles.container}>
                {data?.webtoons.map((webtoon: WebtoonInfo) => (
                    <Card
                        key={webtoon.id}
                        id={webtoon.id}
                        thumbnail={webtoon.thumbnail}
                        title={webtoon.title}
                        authors={webtoon.authors}
                        provider={webtoon.provider}
                        updateDays={webtoon.updateDays}
                        fanCount={webtoon.fanCount}
                        isEnd={webtoon.isEnd}
                        isUpdated={webtoon.isUpdated}
                    />
                ))}
            </div>
        </div>
    );
}
