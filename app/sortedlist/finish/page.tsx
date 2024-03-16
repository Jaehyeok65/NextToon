import { API } from '@/services/API';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import ClientComponent from './ClientComponent';

export const metadata = {
    title: 'NextToon | 완결',
};

export default async function Page() {
    return <ClientComponent  />;
}
