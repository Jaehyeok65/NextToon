import ClientComponent from './ClientComponent';

export const metadata = {
    title: 'NextToon | 인기웹툰',
};

export default async function Page({
    params,
}: {
    params: { service: string }
}) {
    return <ClientComponent service={params.service} defaultdepth={300} perPage={1000}  />;
}
