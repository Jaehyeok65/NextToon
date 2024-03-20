import type { Metadata } from 'next';
import Providers from '@/utils/provider';
import './globals.css';
import Header from '@/components/Header';
import React from 'react';

export const metadata: Metadata = {
    title: 'NextToon | 메인페이지',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
