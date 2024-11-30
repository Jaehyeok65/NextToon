'use client';

import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { CardInfo } from '@/types/type';
import Navigate from '@/components/Navigate';
import { useBookmarkWebtoons } from '../hooks/useBookmarkWebtoons';
import { useBookmarkCategory } from '../hooks/useBookmarkCategory';

export default function ClientComponent() {
    const { category, setCategory, setCategoryWebtoons, SelectedCategory } =
        useBookmarkCategory();
    const { webtoons, setWebtoons } = useBookmarkWebtoons({
        category,
        setCategoryWebtoons,
    });

    if (!webtoons) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>Loading...</h2>
            </div>
        );
    }

    if (webtoons?.length === 0) {
        return (
            <div className={styles.background}>
                <Navigate
                    category={category}
                    setCategory={setCategory}
                    SelectedCategory={SelectedCategory}
                    bookmark={true}
                />
                <h2 className={styles.searchcontent}>
                    북마크에 등록된 작품이 없습니다.
                </h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <Navigate
                category={category}
                setCategory={setCategory}
                SelectedCategory={SelectedCategory}
                bookmark={true}
            />
            <div className={styles.container}>
                {webtoons?.map((webtoon: CardInfo) => (
                    <Card
                        key={webtoon.id}
                        id={webtoon.id}
                        thumbnail={webtoon.thumbnail}
                        title={webtoon.title}
                        authors={webtoon.authors}
                        provider={webtoon.provider}
                        setWebtoons={setWebtoons}
                        setCategoryWebtoons={setCategoryWebtoons}
                        category={category}
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
