"use client";

import styles from '@/style/modal.module.css';
import { useRouter } from 'next/navigation';
import { FaRegTimesCircle } from "react-icons/fa";


export default function Modal( { children} : {children : React.ReactNode}) {
    const router = useRouter();

    return (
        <div className={styles.background}>
            <div className={styles.modal}>
                {children}
                <FaRegTimesCircle className={styles.close} onClick={() => router.back()}/>
            </div>
        </div>
    )
}