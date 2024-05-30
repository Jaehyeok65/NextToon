'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/style/header.module.css';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaAngleDown } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

const navigate = [
    { content: '홈으로', link: '/' },
    { content: '전체보기', link: '/list' },
    { content: '네이버웹툰', link: '/list/naver' },
    { content: '카카오웹툰', link: '/list/kakao' },
    { content: '카카오페이지', link: '/list/kakaopage' },
    { content: '인기웹툰', link: '/sortedlist' },
    { content: '북마크', link: '/bookmark' },
];

export default function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [inputanimate, setInputAnimate] = useState<string>('inputmount'); //언마운트시 작동할 애니메이션이 필요
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropanimate, setDropAnimate] = useState<string>('dropmount');
    const [content, setContent] = useState<string>('');

    const path = usePathname();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const inputRef: any = useRef();

    const dropRef: any = useRef();

    const router = useRouter();

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const onNavigation = (link: string) => {
        router.push(link);
        toggleDropdown();
    };

    const onSearchSubmit = (e: any) => {
        e.preventDefault();
        router.push(`/search/${content}`);
    };

    const getMenuName = () => {
        switch (path) {
            case '/list':
                return '전체보기';
                break;
            case '/list/naver':
                return '네이버웹툰';
                break;
            case '/list/kakao':
                return '카카오웹툰';
                break;
            case '/list/kakaopage':
                return '카카오페이지';
                break;
            case '/sortedlist':
            case '/sortedlist/kakaoPage':
            case '/sortedlist/kakao':
            case '/sortedlist/naver':
            case '/sortedlist/finish':
                return '인기웹툰';
                break;
            case '/bookmark':
                return '북마크';
                break;
            default:
                return '메뉴';
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setInputAnimate('inputunmount');
                setTimeout(() => setShowSearch(false), 400);
                setTimeout(() => setInputAnimate('inputmount'), 400);

            }
        };
        document.addEventListener('mousedown', handleClickOutside); //마운트시 이벤트리스너 추가
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); //언마운트시 이벤트리스너 제거
        };
    }, [inputRef]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setDropAnimate('dropunmount');
                setTimeout(() => setShowDropdown(false), 400);
                setTimeout(() => setDropAnimate('dropmount'), 400);
            }
        };
        document.addEventListener('mousedown', handleClickOutside); //마운트시 이벤트리스너 추가
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); //언마운트시 이벤트리스너 제거
        };
    }, [dropRef]);

    return (
        <header className={styles.header}>
            <div className={styles.innerheader}>
                <div
                    className={styles.headercontent}
                    onClick={() => router.push('/')}
                >
                    NEXTTOON
                </div>
                <div className={styles.menu} ref={dropRef}>
                    <span onClick={toggleDropdown}>
                        {getMenuName()}&nbsp;
                        <FaAngleDown size={'12px'} />
                    </span>
                    {showDropdown && (
                        <div className={styles[dropanimate]}>
                            {navigate.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => onNavigation(item.link)}
                                >
                                    {item.content}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.searchContainer}>
                {!showSearch && (
                    <FaSearch
                        className={styles.icon}
                        size={'28px'}
                        onClick={toggleSearch}
                        data-testid='searchicon'
                    />
                )}
                {showSearch && (
                    <form onSubmit={onSearchSubmit}>
                        {' '}
                        <input
                            type="text"
                            placeholder="검색할 작품을 입력하세요..."
                            className={styles[inputanimate]}
                            ref={inputRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </form>
                )}
            </div>
        </header>
    );
}
