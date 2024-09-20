import React from 'react';
import styles from '@/style/navigate.module.css';

interface Navigate {
    category: string;
    SelectedCategory: string[];
    setCategory: any;
    bookmark?: boolean;
}

const Navigate: React.FC<Navigate> = ({
    category,
    setCategory,
    SelectedCategory,
    bookmark,
}) => {
    return (
        <div className={bookmark ? styles.bookmarknavigate : styles.navigate}>
            {SelectedCategory.map((item: string) => (
                <div key={item}>
                    {category === item ? (
                        <button
                            onClick={() => setCategory(item)}
                            className={styles.selectedbtn}
                        >
                            {item}
                        </button>
                    ) : (
                        <button
                            onClick={() => setCategory(item)}
                            className={styles.navigatebtn}
                        >
                            {item}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default React.memo(Navigate);
