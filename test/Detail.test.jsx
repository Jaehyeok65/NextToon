import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DetailPage from '@/app/detail/[...title]/page';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

window.alert = jest.fn();

describe('Detail Component Test', () => {
    it('모킹된 데이터와 params의 Title과 Service가 정확하게 일치할 때 Detail Page가 정상적으로 렌더링된다.', async () => {
        render(
            await DetailPage({
                params: {
                    title: ['무련', 'KAKAO_PAGE'],
                },
            })
        );

        expect(screen.getByText('무련')).toBeInTheDocument();
    });

    it('모킹된 데이터와 params의 Title이 일치하지만 모킹된 데이터와 params의 Service가 일치하지 않을 때는 데이터가 올바르지 않습니다. Text가 렌더링된다.', async () => {
        render(
            await DetailPage({
                params: {
                    title: ['무련', '잉여데이터'],
                },
            })
        );

        expect(
            screen.getByText('데이터가 올바르지 않습니다.')
        ).toBeInTheDocument();
    });

    it('모킹된 데이터와 params의 Title이 일치하지 않을 때는 데이터가 올바르지 않습니다. Text가 렌더링된다.', async () => {
        render(
            await DetailPage({
                params: {
                    title: ['하이', '잉여데이터'],
                },
            })
        );

        expect(
            screen.getByText('데이터가 올바르지 않습니다.')
        ).toBeInTheDocument();
    });

    it('북마크 추가하기 버튼을 클릭하면 북마크에 추가된다.', async () => {
        render(
            await DetailPage({
                params: {
                    title: ['무련', 'KAKAO_PAGE'],
                },
            })
        );

        const addbookmark = screen.getByText('북마크 추가하기');
        expect(addbookmark).toBeInTheDocument();

        fireEvent.click(addbookmark);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('북마크에 등록되었습니다.');
        })
    });
});
