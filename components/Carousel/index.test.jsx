import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Carousel from '.';
import {
    CheckBookMark,
    getServiceName,
    AddBookMark,
    RemoveBookMark,
    getFanCount,
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
}));

describe('캐러셀 컴포넌트 테스트', () => {
    const testlist = [
        {
            _id: '12345',
            img: 'list1.png',
            title: '제목1',
            author: '작가1',
            service: '서비스1',
            fanCount: 1,
        },
        {
            _id: '12346',
            img: 'list2.png',
            title: '제목2',
            author: '작가2',
            service: '서비스2',
            fanCount: 2,
        },
        {
            _id: '12347',
            img: 'list3.png',
            title: '제목3',
            author: '작가3',
            service: '서비스3',
            fanCount: 3,
        },
        {
            _id: '12348',
            img: 'list4.png',
            title: '제목4',
            author: '작가4',
            service: '서비스4',
            fanCount: 4,
        },
        {
            _id: '12349',
            img: 'list5.png',
            title: '제목5',
            author: '작가5',
            service: '서비스5',
            fanCount: 5,
        },
    ];
    it('캐러셀 컴포넌트가 정상적으로 렌더링된다.', () => {
        render(<Carousel list={testlist} />);

        // 이미지 요소를 찾습니다.
        const imageElement = screen.getByAltText('제목1');

        const titleElement = screen.getByText('제목1');

        const authorElement = screen.getByText('작가1');

        // 이미지 요소가 존재하는지 확인합니다.
        expect(imageElement).toBeInTheDocument();

        expect(titleElement).toBeInTheDocument();

        expect(authorElement).toBeInTheDocument();
        // 이미지의 src 속성을 확인합니다.
        expect(imageElement).toHaveAttribute('src', 'list1.png');
    });

    it('브라우저의 크기가 600미만일때는 하나의 카드만 렌더링된다.', () => {
        global.innerWidth = 599;

        render(<Carousel list={testlist} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.queryByText('제목2');

        expect(title2Element).not.toBeInTheDocument();
    });

    it('브라우저의 크기가 600이상 1000미만일때는 두 개의 카드가 렌더링된다.', () => {
        global.innerWidth = 700;

        render(<Carousel list={testlist} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.getByText('제목2');

        expect(title2Element).toBeInTheDocument();

        const title3Element = screen.queryByText('제목3');

        expect(title3Element).not.toBeInTheDocument();
    });

    it('브라우저의 크기가 1000이상 1400미만일때는 세 개의 카드가 렌더링된다.', () => {
        global.innerWidth = 1100;

        render(<Carousel list={testlist} />);

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

        render(<Carousel list={testlist} />);

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

        render(<Carousel list={testlist} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const title2Element = screen.queryByText('제목2');

        expect(title2Element).not.toBeInTheDocument();
    });

    it('left 화살표를 클릭하면 캐러셀 컴포넌트의 데이터가 왼쪽으로 한 칸 이동한다.', async () => {
        global.innerWidth = 599;

        render(<Carousel list={testlist} />);

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

        render(<Carousel list={testlist} />);

        const titleElement = screen.getByText('제목1');

        expect(titleElement).toBeInTheDocument();

        const rightbutton = screen.getByTestId('right');

        fireEvent.click(rightbutton);

        await waitFor(() => {
            const titleElement = screen.getByText('제목2');

            expect(titleElement).toBeInTheDocument();
        });
    });
});