import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import DetailPage from '@/app/detail/[...title]/page';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Detail Component Test', () => {
    it('모킹된 데이터와 params의 Title과 Service가 정확하게 일치할 때 Detail Page가 정상적으로 렌더링된다.', async () => {
        render(
            await DetailPage({
                params: {
                    title: ['무련', '카카오페이지'],
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
});
