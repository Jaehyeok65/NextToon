/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: 'image-comic.pstatic.net',
            },
            {
                hostname: 'localhost:3000',
                port: '3000',
            },
            {
                hostname: 'kr-a.kakaopagecdn.com',
            },
            {
                hostname: 'dn-img-page.kakao.com',
            },
            {
                hostname: 'next-toon.vercel.app',
            },
        ],
    },
    devIndicators: {
        autoPrerender: false,
    },
    env: {
        NEXT_PUBLIC_API:
            process.env.NODE_ENV === 'development'
                ? 'https://korea-webtoon-api.herokuapp.com'
                : process.env.NODE_ENV === 'test'
                ? 'http://localhost:9090'
                : 'https://korea-webtoon-api.herokuapp.com',
    },
};

module.exports = nextConfig;
