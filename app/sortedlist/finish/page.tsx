import ClientComponent from './ClientComponent';

export const metadata = {
    title: 'NextToon | 완결',
};

export default async function Page() {
    return <ClientComponent defaultdepth={1000} perPage={5000} />;
}
