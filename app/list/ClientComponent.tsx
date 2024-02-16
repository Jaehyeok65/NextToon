'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFirstList, getNextList } from '@/services/firebase';
import useObserver from '@/hooks/userObserver';
import { AxiosError } from 'axios';
import { DocumentData } from 'firebase/firestore';
import Card from '@/components/Card';
import styled from 'styled-components';
import Skeleton from '@/utils/Skeleton';

const BackGround = styled.div`
    margin: 10% 20% 10% 20%;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
`;

export default function ClientComponent() {

    const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending, data } =
        useInfiniteQuery<DocumentData, AxiosError, DocumentData, [string], any>(
            {
                queryKey: ['items'],
                queryFn: ({ pageParam }) => {
                    return pageParam ? getNextList(pageParam) : getFirstList()
                },
                getNextPageParam: (lastPage) => {
                    if (lastPage.size < 8) return undefined;
                    else return lastPage.docs[lastPage.docs.length - 1];
                },
                initialPageParam: null,
            }
        );

    const ref = useObserver(hasNextPage, fetchNextPage);



    return (
        <BackGround>
            <Container>
                {data
                    ? data.pages
                          .flatMap((page: any) =>
                              page.docs.map((doc: any) => doc.data())
                          )
                          .map((post: any, index: number) => (
                              <Card
                                  key={index}
                                  url={post.url}
                                  name={post.name}
                                  price={post.price}
                              />
                          ))
                    : <Skeleton /> }
            </Container>
            {!isPending && <div ref={ref}></div>}
            {isFetchingNextPage && (
                <Skeleton />
            )}
        </BackGround>
    );
}
