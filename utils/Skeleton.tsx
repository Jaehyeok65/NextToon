


import CardSkeleton from './CardSkeleton';
import styles from '@/style/cardskeleton.module.css'


const Skeleton = () => {

    return(
        <div className={styles.cardcontainer} data-testid='skeleton'>
            { Array.from({length : 12}).map((_,index : number) => (
                <CardSkeleton key={index}/>
            ))}
        </div>
    );
}


export default Skeleton;