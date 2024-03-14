import styles from '@/style/detail.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <h2 className={styles.loading}>Loading...</h2>
        </div>
    );
}
