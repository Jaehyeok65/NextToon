'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/style/header.module.css';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [animate, setAnimate] = useState<string>('inputmount'); //언마운트시 작동할 애니메이션이 필요

    const inputRef: any = useRef();

    const router = useRouter();

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        //setTimeout(() => setAnimate('inputunmount'), 2000);
    };

    const onNavigation = () => {
        router.push('/');
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setAnimate('inputunmount');
                setTimeout(() => setShowSearch(false), 400);
                setTimeout(() => setAnimate('inputmount'), 400);
            }
        };
        document.addEventListener('mousedown', handleClickOutside); //마운트시 이벤트리스너 추가
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); //언마운트시 이벤트리스너 제거
        };
    }, [inputRef]);

    return (
        <header className={styles.header}>
            <div className={styles.headercontent} onClick={onNavigation}>NEXTTOON</div>
            <div className={styles.searchContainer}>
                {!showSearch && (
                    <FaSearch
                        className={styles.icon}
                        size={'28px'}
                        onClick={toggleSearch}
                    />
                )}
                {showSearch && (
                    <input
                        type="text"
                        placeholder="검색할 작품을 입력하세요..."
                        className={styles[animate]}
                        ref={inputRef}
                    />
                )}
            </div>
        </header>
    );
}
