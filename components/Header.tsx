import styles from '@/style/header.module.css';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
    return (
        <header className={styles.header}>
            <div>NEXTTOON</div>
            <FaSearch className={styles.search} size={'28px'} />
        </header>
    );
}
