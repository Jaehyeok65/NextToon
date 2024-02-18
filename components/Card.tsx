"use client";


import styles from '@/style/card.module.css';
import { WebtoonInfo } from '@/types/type';
import { useRouter } from 'next/navigation';



const Card: React.FC<WebtoonInfo> = ({ img, title, author, service }) => {


    const getServiceName = (service : string) => {
        switch(service) {
            case 'naver':
                return '네이버 웹툰'
                break;
            case 'kakao':
                return '카카오 웹툰'
                break;
            case 'kakaoPage':
                return '카카오페이지 웹툰'
                break;
        }
    }

    

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
               <div>
                {getServiceName(service)}
               </div>
            </div>
        </div>
    );

};

export default Card;
