import React from 'react';


export default function RootLayout({
    children,
    modal
}: {
    children: React.ReactNode;
    modal : React.ReactNode;
}) {
    return (
        <div>
            {modal}
            {children}
        </div>
    );
}
