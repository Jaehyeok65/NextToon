"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

const ImgSkeleton = styled.div`
    width : 100%;
    height : 260px;
    background-color : #f2f2f2;
`;

const TextSkeleton = styled.div`
    width : 200px;
    margin-top : 10px;
    height : 16px;
    margin-bottom : 10px;
    margin-left : 100px;
    background-color : #f2f2f2;
`;

const TitleSkeleton = styled.div`
    width : 200px;
    margin-top : 10px;
    height : 28px;
    margin-bottom : 10px;
    background-color : #f2f2f2;
`



const CardSkeleton: React.FC = () => {
    return (
        <Cards data-testid="card">
           <ImgSkeleton />
           <TitleSkeleton />
           <TextSkeleton />
        </Cards>
    );
};

export default React.memo(CardSkeleton);
