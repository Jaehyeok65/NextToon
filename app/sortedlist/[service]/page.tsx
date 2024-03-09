import { API } from '@/services/API';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import ClientComponent from './ClientComponent';

export const metadata = {
    title: 'NextToon | 인기웹툰',
};

export default async function Page({
    params,
}: {
    params: { service: string };
}) {
    return <ClientComponent service={params.service} />;
}
