import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Header from '.';
import { fireEvent } from '@testing-library/react';
import {
    CheckBookMark,
    getServiceName,
    AddBookMark,
    RemoveBookMark,
    getFanCount,
} from '@/utils/Bookmark'; // 모듈 import 추가
import MainCarousel from '.';
import { usePathname, useRouter } from 'next/navigation';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/utils/Bookmark', () => ({
    CheckBookMark: jest.fn(),
    getServiceName: jest.fn(),
    AddBookMark: jest.fn(),
    RemoveBookMark: jest.fn(),
    getFanCount: jest.fn(),
}));

describe('MainCarousel 컴포넌트 테스트', () => {
    const testlist = [
        {
            _id: '12345',
            img: '/list1.png',
            title: '제목1',
            author: '작가1',
            service: '서비스1',
            fanCount: 1,
        },
        {
            _id: '12346',
            img: '/list2.png',
            title: '제목2',
            author: '작가2',
            service: '서비스2',
            fanCount: 2,
        },
        {
            _id: '12347',
            img: '/list3.png',
            title: '제목3',
            author: '작가3',
            service: '서비스3',
            fanCount: 3,
        },
        {
            _id: '12348',
            img: '/list4.png',
            title: '제목4',
            author: '작가4',
            service: '서비스4',
            fanCount: 4,
        },
        {
            _id: '12349',
            img: '/list5.png',
            title: '제목5',
            author: '작가5',
            service: '서비스5',
            fanCount: 5,
        },
    ];

    afterEach(() => {
        cleanup();
    });
    it('MainCarousel 컴포넌트에서 Carousel 컴포넌트가 정상적으로 렌더링된다', () => {
        render(
            <MainCarousel list={testlist} title="전체 웹툰" address="/list" />
        );

        // 이미지 요소를 찾습니다.
        const imageElement = screen.getByAltText('제목1');

        const titleElement = screen.getByText('제목1');

        const authorElement = screen.getByText('작가1');

        // 이미지 요소가 존재하는지 확인합니다.
        expect(imageElement).toBeInTheDocument();

        expect(titleElement).toBeInTheDocument();

        expect(authorElement).toBeInTheDocument();
    });

    it('MainCarousel 컴포넌트를 렌더링할 때 title로 넘겨준 Props가 제대로 렌더링된다.', () => {
        render(
            <MainCarousel list={testlist} title="전체 웹툰" address="/list" />
        );

        const titleElement = screen.getByText('전체 웹툰');

        expect(titleElement).toBeInTheDocument();
    });

    it('MainCarousel 컴포넌트를 렌더링할 때 address로 넘겨준 Props가 제대로 렌더링된다.', () => {
        render(
            <MainCarousel list={testlist} title="전체 웹툰" address="/list" />
        );

        const addressElement = screen.getByRole('link', { name: '바로가기' });

        expect(addressElement).toHaveAttribute('href', '/list');
    });

});
