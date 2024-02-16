'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'next/image';
import styled from 'styled-components';
import styles from '@/style/card.module.css';

/*const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;*/

const Cards = styled.div`
    border: 1px solid #fff;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    width: 99%;
    max-width: 200px;
    max-height: 400px;

    > div {
        text-align: center;
        color: inherit;
        text-decoration: none;
    }

    > img {
        width: 100%;
        height: 70%;
    }
    &:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }

    @media screen and (max-width: 600px) {
        > img {
            width: 100%;
            height: 70%;
        }
    }
`;

interface CardProps {
    url: string;
    name: string;
    price: string;
}

const Card: React.FC<CardProps> = ({ url, name, price }) => {


    return (
        <div className={styles.card}>
            <Image
                src={url}
                alt={name}
                width={500}
                height={300}
                priority
            />
            <div
                style={{
                    fontSize: '13px',
                    color: 'inherit',
                    fontWeight: 'bold',
                }}
            >
                {name}
            </div>

            <div
                style={{
                    fontSize: '12px',
                    color: 'gray',
                    textAlign: 'right',
                }}
            >
                {price}원
            </div>
        </div>
    );
};

export default React.memo(Card);
