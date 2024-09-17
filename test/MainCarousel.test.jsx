import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import {
    CheckBookMark,
    getServiceName,
    AddBookMark,
    RemoveBookMark,
    getFanCount,
    getSerialDay,
    getAuthors
} from '@/utils/Bookmark'; // 모듈 import 추가
import MainCarousel from '../components/MainCarousel';
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
    getSerialDay : jest.fn(),
    getAuthors : jest.fn()
}));

describe('MainCarousel 컴포넌트 테스트', () => {
    const testlist = [
        {
            id: '12345',
            thumbnail: ['/public/img1.jpg'],
            title: '제목1',
            authors: ['작가1'],
            provider: '서비스1',
            fanCount: 1,
            updateDays: ['월'],
            isEnd: false,
        },
        {
            id: '12346',
            thumbnail: ['/public/img2.jpg'],
            title: '제목2',
            authors: ['작가2'],
            provider: '서비스2',
            fanCount: 2,
            updateDays: ['월'],
            isEnd: false,
        },
        {
            id: '12347',
            thumbnail: ['/public/img3.jpg'],
            title: '제목3',
            authors: ['작가3'],
            provider: '서비스3',
            fanCount: 3,
            updateDays: ['월'],
            isEnd: false,
        },
        {
            id: '12348',
            thumbnail: ['/public/img4.jpg'],
            title: '제목4',
            authors: ['작가4'],
            provider: '서비스4',
            fanCount: 4,
            updateDays: ['월'],
            isEnd: false,
        },
        {
            id: '12349',
            thumbnail: ['/public/img5.jpg'],
            title: '제목5',
            authors: ['작가5'],
            provider: '서비스5',
            fanCount: 5,
            updateDays: ['월'],
            isEnd: false,
        },
    ];
    afterEach(() => {
        cleanup();
    });
    it('MainCarousel 컴포넌트에서 Carousel 컴포넌트가 정상적으로 렌더링된다', () => {
        render(
            <MainCarousel list={testlist} title="전체 웹툰" address="/list" initialdepth={4} />
        );

        // 이미지 요소를 찾습니다.
        const imageElement = screen.getByAltText('제목1');

        const titleElement = screen.getByText('제목1');


        // 이미지 요소가 존재하는지 확인합니다.
        expect(imageElement).toBeInTheDocument();

        expect(titleElement).toBeInTheDocument();
    });

    it('MainCarousel 컴포넌트를 렌더링할 때 title로 넘겨준 Props가 제대로 렌더링된다.', () => {
        render(
            <MainCarousel list={testlist} title="전체 웹툰" address="/list" initialdepth={4}/>
        );

        const titleElement = screen.getByText('전체 웹툰');

        expect(titleElement).toBeInTheDocument();
    });

    it('MainCarousel 컴포넌트를 렌더링할 때 address로 넘겨준 Props가 제대로 렌더링된다.', () => {
        render(
            <MainCarousel list={testlist} title="전체 웹툰" address="/list" initialdepth={4}/>
        );

        const addressElement = screen.getByRole('link', { name: '바로가기' });

        expect(addressElement).toHaveAttribute('href', '/list');
    });
});
