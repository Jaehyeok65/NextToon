import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Header from '.';
import { fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

describe('Header Component Test', () => {
    afterEach(() => {
        cleanup();
    });
    it('Header 컴포넌트의 텍스트들이 정상적으로 렌더링된다.', () => {
        render(<Header />);

        const NextToonText = screen.getByText('NEXTTOON');

        expect(NextToonText).toBeInTheDocument();

        const MenuText = screen.getByText('메뉴');

        expect(MenuText).toBeInTheDocument();
    });

    it('현재 경로가 /list라면 Header컴포넌트의 메뉴 텍스트가 "전체보기"로 변경된다.', () => {
        usePathname.mockReturnValue('/list');

        render(<Header />);

        const MenuText = screen.getByText('전체보기');

        expect(MenuText).toBeInTheDocument();
    });

    it('현재 경로가 /bookmark라면 Header컴포넌트의 메뉴 텍스트가 "북마크"로 변경된다.', () => {
        usePathname.mockReturnValue('/bookmark');

        render(<Header />);

        const MenuText = screen.getByText('북마크');

        expect(MenuText).toBeInTheDocument();
    });

    it('현재 경로가 /list/naver라면 Header컴포넌트의 메뉴 텍스트가 "네이버웹툰"으로 변경된다.', () => {
        usePathname.mockReturnValue('/list/naver');

        render(<Header />);

        const MenuText = screen.getByText('네이버웹툰');

        expect(MenuText).toBeInTheDocument();
    });

    it('Search 아이콘을 누르면 검색바가 나타난다.', async () => {
        render(<Header />);

        const SearchIcon = screen.getByTestId('searchicon');

        expect(SearchIcon).toBeInTheDocument();

        fireEvent.click(SearchIcon);

        await waitFor(() => {
            const inputElement =
                screen.getByPlaceholderText('검색할 작품을 입력하세요...');

            expect(inputElement).toBeInTheDocument();
        });
    });
});
