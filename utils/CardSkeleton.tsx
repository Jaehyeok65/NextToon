import styles from '@/style/cardskeleton.module.css';

const CardSkeleton: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.skeletonanimation}></div>
        </div>
    );
};

export default CardSkeleton;
