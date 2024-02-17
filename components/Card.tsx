


import styles from '@/style/card.module.css';
import { WebtoonInfo } from '@/types/type';



const Card: React.FC<WebtoonInfo> = ({ img, title, author, service }) => {
    return (
        <div className={styles.card}>
            <img
                src={img}
                alt={title}
            />
            <div className={styles.textoverlay}>
               <h4>
                {title}
               </h4>
               <div>
                {author}
               </div>
            </div>
        </div>
    );
};

export default Card;
