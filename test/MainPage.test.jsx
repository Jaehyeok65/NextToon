import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '@/app/page';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('MainPage Component Test', () => {
    it('메인페이지의 Title이 정상적으로 렌더링된다.', async () => {
        render(await MainPage());

        expect(screen.getByText('전체 웹툰')).toBeInTheDocument();
        expect(screen.getByText('네이버 웹툰')).toBeInTheDocument();
        expect(screen.getByText('카카오 웹툰')).toBeInTheDocument();
        expect(screen.getByText('카카오페이지 웹툰')).toBeInTheDocument();
    });

    it('메인페이지의 fetch가 정상적으로 이루어진다.', async () => {
        render(await MainPage());

        const titles = screen.getAllByText('제목1');
        titles.forEach((title) => expect(title).toBeInTheDocument());
    });
});
