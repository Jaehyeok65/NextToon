import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Carousel from '../components/Carousel';
import {
    CheckBookMark,
    getServiceName,
    AddBookMark,
    RemoveBookMark,
    getFanCount,
    getSerialDay,
    getAuthors,
} from '@/utils/Bookmark'; // 모듈 import 추가
import { fireEvent } from '@testing-library/react';

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
    getSerialDay: jest.fn(),
    getAuthors: jest.fn(),
}));

describe('캐러셀 컴포넌트 테스트', () => {
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

    it('캐러셀 컴포넌트가 정상적으로 렌더링된다.', () => {
        render(<Carousel list={testlist} initialdepth={4} />);

        // 이미지 요소를 찾습니다.
        const imageElement = screen.getByAltText('제목1');

        const titleElement = screen.getByText('제목1');

        // 이미지 요소가 존재하는지 확인합니다.
        expect(imageElement).toBeInTheDocument();

        expect(titleElement).toBeInTheDocument();
    });

    it('브라우저의 크기가 600미만일때는 하나의 카드만 렌더링된다.', () => {
        global.innerWidth = 599;

        render(<Carousel list={testlist} initialdepth={1} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.queryByText('제목2');

        expect(title2Element).not.toBeInTheDocument();
    });

    it('브라우저의 크기가 600이상 1000미만일때는 두 개의 카드가 렌더링된다.', () => {
        global.innerWidth = 700;

        render(<Carousel list={testlist} initialdepth={2} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.getByText('제목2');

        expect(title2Element).toBeInTheDocument();

        const title3Element = screen.queryByText('제목3');

        expect(title3Element).not.toBeInTheDocument();
    });

    it('브라우저의 크기가 1000이상 1400미만일때는 세 개의 카드가 렌더링된다.', () => {
        global.innerWidth = 1100;

        render(<Carousel list={testlist} initialdepth={3} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.getByText('제목2');

        expect(title2Element).toBeInTheDocument();

        const title3Element = screen.getByText('제목3');

        expect(title3Element).toBeInTheDocument();

        const title4Element = screen.queryByText('제목4');

        expect(title4Element).not.toBeInTheDocument();
    });

    it('브라우저의 크기가 1400이상 일때는 네 개의 카드가 렌더링된다.', () => {
        global.innerWidth = 1500;

        render(<Carousel list={testlist} initialdepth={4} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.getByText('제목2');

        expect(title2Element).toBeInTheDocument();

        const title3Element = screen.getByText('제목3');

        expect(title3Element).toBeInTheDocument();

        const title4Element = screen.getByText('제목4');

        expect(title4Element).toBeInTheDocument();

        const title5Element = screen.queryByText('제목5');

        expect(title5Element).not.toBeInTheDocument();
    });

    it('브라우저의 크기가 600미만일때는 하나의 카드만 렌더링된다.', () => {
        global.innerWidth = 599;

        render(<Carousel list={testlist} initialdepth={1} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.queryByText('제목2');

        expect(title2Element).not.toBeInTheDocument();
    });

    it('left 화살표를 클릭하면 캐러셀 컴포넌트의 데이터가 왼쪽으로 한 칸 이동한다.', async () => {
        global.innerWidth = 599;

        render(<Carousel list={testlist} initialdepth={1} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const leftbutton = screen.getByTestId('left');

        fireEvent.click(leftbutton);

        await waitFor(() => {
            const titleElement = screen.getByText('제목5');

            expect(titleElement).toBeInTheDocument();
        });
    });

    it('right 화살표를 클릭하면 캐러셀 컴포넌트의 데이터가 오른쪽으로 한 칸 이동한다.', async () => {
        global.innerWidth = 599;

        render(<Carousel list={testlist} initialdepth={1} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const rightbutton = screen.getByTestId('right');

        fireEvent.click(rightbutton);

        await waitFor(() => {
            const titleElement = screen.getByText('제목2');

            expect(titleElement).toBeInTheDocument();
        });
    });

    it('handleResize 함수가 windowWidth를 올바르게 설정하는지 확인하며 올바른 depth가 설정되는지 확인한다.', async () => {
        render(<Carousel list={testlist} initialdepth={1} />);

        // window.innerWidth 값을 변경하여 handleResize 함수가 호출되는지 확인
        act(() => {
            global.innerWidth = 599; // 예시로 임의의 너비를 설정합니다.
            global.dispatchEvent(new Event('resize'));
        });

        await waitFor(() => {
            expect(global.innerWidth).toEqual(599);

            const titleElement = screen.getByText('제목1');

            expect(titleElement).toBeInTheDocument();

            const title2Element = screen.queryByText('제목2');

            expect(title2Element).not.toBeInTheDocument();
        });

        act(() => {
            global.innerWidth = 999; // 예시로 임의의 너비를 설정합니다.
            global.dispatchEvent(new Event('resize'));
        });

        await waitFor(() => {
            expect(global.innerWidth).toEqual(999);

            const titleElement = screen.getByText('제목1');

            expect(titleElement).toBeInTheDocument();

            const title2Element = screen.getByText('제목2');

            expect(title2Element).toBeInTheDocument();

            const title3Element = screen.queryByText('제목3');

            expect(title3Element).not.toBeInTheDocument();
        });

        act(() => {
            global.innerWidth = 1399; // 예시로 임의의 너비를 설정합니다.
            global.dispatchEvent(new Event('resize'));
        });

        await waitFor(() => {
            expect(global.innerWidth).toEqual(1399);

            const titleElement = screen.getByText('제목1');

            expect(titleElement).toBeInTheDocument();

            const title2Element = screen.getByText('제목2');

            expect(title2Element).toBeInTheDocument();

            const title3Element = screen.getByText('제목3');

            expect(title3Element).toBeInTheDocument();

            const title4Element = screen.queryByText('제목4');

            expect(title4Element).not.toBeInTheDocument();
        });

        act(() => {
            global.innerWidth = 1401; // 예시로 임의의 너비를 설정합니다.
            global.dispatchEvent(new Event('resize'));
        });

        await waitFor(() => {
            expect(global.innerWidth).toEqual(1401);

            const titleElement = screen.getByText('제목1');

            expect(titleElement).toBeInTheDocument();

            const title2Element = screen.getByText('제목2');

            expect(title2Element).toBeInTheDocument();

            const title3Element = screen.getByText('제목3');

            expect(title3Element).toBeInTheDocument();

            const title4Element = screen.getByText('제목4');

            expect(title4Element).toBeInTheDocument();

            const title5Element = screen.queryByText('제목5');

            expect(title5Element).not.toBeInTheDocument();
        });
    });
});
