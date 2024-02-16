import {
    collection,
    getDocs,
    query,
    orderBy,
    startAfter,
    limit,
    DocumentData,
    QuerySnapshot,
} from 'firebase/firestore';
import { db } from '@/config/mybase';
import { Product } from '@/types/type';

/*export const getFirstList = async () => {
    const first = query(collection(db, 'shopping'), limit(8));
    const postSnap = await getDocs(first);

    const data: Product[] = postSnap.docs.map((doc) => {
        return {
            check: doc.data().check,
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity,
            url: doc.data().url,
            userId: doc.data().userId,
        };
    });

    return data;
};

export const getNextList = async (
    pageParam: QuerySnapshot
): Promise<DocumentData> => {
    if (!pageParam) {
        const data = getFirstList();
        return data;
    }

    const next = query(collection(db,'shopping'),startAfter(pageParam),limit(8));

    const nextSnap = await getDocs(next);

    const data: Product[] = nextSnap.docs.map((doc) => {
        return {
            check: doc.data().check,
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity,
            url: doc.data().url,
            userId: doc.data().userId,
        };
    });

    return data;
};*/

export const getFirstList = async () => {
    const first = query(collection(db, 'shopping'), limit(8));
    const postSnap = await getDocs(first);

    //console.log("몇 번 실행되냐");
    return postSnap;

    /* const data : DocumentData  = postSnap.docs.map((doc) => ({
        ...doc.data(),
    }));


    return data;*/
};

/*export const next = async (pageParam: number) => {
    const next = query(
        collection(db, 'shopping'),
        startAfter(pageParam),
        limit(5)
    );

    const nextSnap = await getDocs(next);
    const data = nextSnap.docs.map((doc) => ({
        ...doc.data(),
    }));
    return data;
};*/

export const getNextList = async (pageParam: QuerySnapshot): Promise<DocumentData> => {

    const next = query(
        collection(db, 'shopping'),
        startAfter(pageParam),
        limit(8)
    );

    const nextSnap = await getDocs(next);

    return nextSnap;
}