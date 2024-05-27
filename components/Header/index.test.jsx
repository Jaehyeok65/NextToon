import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Header from '.';
import { fireEvent } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

const pushMock = jest.fn();
useRouter.mockReturnValue({ push: pushMock });

afterEach(() => {
    cleanup();
});

beforeEach(() => {
    jest.clearAllMocks(); // 모든 Mock 초기화
    useRouter.mockReturnValue({ push: pushMock }); // useRouter 모의 설정
    usePathname.mockReset(); // usePathname 모의 함수 초기화
});

describe('Header Component Test', () => {
    it('Header 컴포넌트의 텍스트들이 정상적으로 렌더링된다.', () => {
        render(<Header />);

        const NextToonText = screen.getByText('NEXTTOON');

        expect(NextToonText).toBeInTheDocument();

        const MenuText = screen.getByText('메뉴');

        expect(MenuText).toBeInTheDocument();
    });

    it('현재 경로에 따라 Header컴포넌트의 메뉴 텍스트가 변경된다.', () => {
        usePathname.mockReturnValue('/list');

        render(<Header />);

        let MenuText; //달라질 결과를 담을 변수 선언

        MenuText = screen.getByText('전체보기');

        expect(MenuText).toBeInTheDocument();

        usePathname.mockReturnValue('/list/naver');

        render(<Header />);

        MenuText = screen.getByText('네이버웹툰');

        expect(MenuText).toBeInTheDocument();

        usePathname.mockReturnValue('/list/kakao');

        render(<Header />);

        MenuText = screen.getByText('카카오웹툰');

        expect(MenuText).toBeInTheDocument();

        usePathname.mockReturnValue('/list/kakaopage');

        render(<Header />);

        MenuText = screen.getByText('카카오페이지');

        expect(MenuText).toBeInTheDocument();

        usePathname.mockReturnValue('/sortedlist');

        render(<Header />);

        MenuText = screen.getByText('인기웹툰');

        expect(MenuText).toBeInTheDocument();

        usePathname.mockReturnValue('/bookmark');

        render(<Header />);

        MenuText = screen.getByText('북마크');

        expect(MenuText).toBeInTheDocument();
    });

    it('Search 아이콘을 누르면 검색바가 나타나며 검색을 하면 검색결과 페이지로 이동한다.', async () => {
        render(<Header />);

        const SearchIcon = screen.getByTestId('searchicon');

        expect(SearchIcon).toBeInTheDocument();

        fireEvent.click(SearchIcon);

        await waitFor(() => {
            const inputElement =
                screen.getByPlaceholderText('검색할 작품을 입력하세요...');

            expect(inputElement).toBeInTheDocument();
        });

        const inputElement =
            screen.getByPlaceholderText('검색할 작품을 입력하세요...');

        fireEvent.change(inputElement, { target: { value: '백련성신' } });

        expect(inputElement.value).toBe('백련성신');

        const formElement = inputElement.closest('form');

        fireEvent.submit(formElement);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/search/백련성신');
        });
    });

    it('NEXTTOON 텍스트를 클릭하면 홈으로 이동한다.', async () => {
        render(<Header />);

        const TextElement = screen.getByText('NEXTTOON');

        expect(TextElement).toBeInTheDocument();

        fireEvent.click(TextElement);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/');
        });
    });

    it('메뉴 버튼을 클릭하면 네비게이션 리스트들이 나오며 리스트들을 클릭하면 각 페이지로 이동한다.', async () => {
        render(<Header />);

        const MenuElement = screen.getByText('메뉴');

        expect(MenuElement).toBeInTheDocument();

        fireEvent.click(MenuElement);

        await waitFor(() => {
            expect(screen.getByText('홈으로')).toBeInTheDocument();
            expect(screen.getByText('전체보기')).toBeInTheDocument();
            expect(screen.getByText('네이버웹툰')).toBeInTheDocument();
            expect(screen.getByText('카카오웹툰')).toBeInTheDocument();
            expect(screen.getByText('카카오페이지')).toBeInTheDocument();
            expect(screen.getByText('인기웹툰')).toBeInTheDocument();
            expect(screen.getByText('북마크')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('전체보기'));

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/list');
        });
    });

    it('Input창이 활성화 된 상태에서 Input창 외부를 클릭하면 Input창이 닫힌다.', async () => {
        render(<Header />);

        const SearchIcon = screen.getByTestId('searchicon');

        expect(SearchIcon).toBeInTheDocument();

        fireEvent.click(SearchIcon);

        await waitFor(() => {
            const inputElement =
                screen.getByPlaceholderText('검색할 작품을 입력하세요...');

            expect(inputElement).toBeInTheDocument();
        });

        fireEvent.mouseDown(document);

        await waitFor(() => {
            expect(
                screen.queryByPlaceholderText('검색할 작품을 입력하세요...')
            ).not.toBeInTheDocument();
        });
    });
});
