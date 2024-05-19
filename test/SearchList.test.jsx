import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SearchListPage from '@/app/search/[title]/page';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('SearchList Component Test', () => {
    it('검색결과가 없을 때는 검색된 작품이 없습니다. Text가 렌더링된다.', async () => {
        useRouter.mockImplementation(() => ({
            query: {
                params: {
                    title: '테스트용',
                },
            },
        }));
        render(
            await SearchListPage({
                params: {
                    title: '테스트용',
                },
            })
        );

        expect(screen.getByText('"테스트용"')).toBeInTheDocument();
        expect(screen.getByText('검색된 작품이 없습니다.')).toBeInTheDocument();
    });

    it('title 변수로 모킹된 작품 이름이 주어졌을 때 올바른 검색결과가 리턴된다1', async () => {
        useRouter.mockImplementation(() => ({
            query: {
                params: {
                    title: '백련',
                },
            },
        }));
        render(
            await SearchListPage({
                params: {
                    title: '백련',
                },
            })
        );

        expect(screen.getByText('"백련"')).toBeInTheDocument();
        expect(screen.getByAltText('백련')).toHaveAttribute(
            'src',
            '/public/img25'
        );
    });

    it('title 변수로 모킹된 작품 이름이 주어졌을 때 올바른 검색결과가 리턴된다2', async () => {
        useRouter.mockImplementation(() => ({
            query: {
                params: {
                    title: '무련',
                },
            },
        }));
        render(
            await SearchListPage({
                params: {
                    title: '무련',
                },
            })
        );

        expect(screen.getByText('"무련"')).toBeInTheDocument();
        expect(screen.getByAltText('무련')).toHaveAttribute(
            'src',
            '/public/img26'
        );
    });
});
