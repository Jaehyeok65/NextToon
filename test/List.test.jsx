import { render, screen, waitFor } from '@testing-library/react';
import ClientComponent from '@/app/list/ClientComponent';
import { RenderWithQuery } from '../utils/RenderWithQuery';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

describe('List Page 테스트', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe,
            unobserve,
            disconnect,
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    it('List Page 초기 렌더링 및 모킹 테스트', async () => {
        render(
            <RenderWithQuery>
                <ClientComponent />
            </RenderWithQuery>
        );

        await waitFor(() => {
            expect(screen.getByText('제목1')).toBeInTheDocument();

            expect(screen.getByAltText('제목1')).toHaveAttribute(
                'src',
                '/public/list1.jpg'
            );
        });
    });

    it('InterSection Observer API를 사용해 관찰자를 등록하여 임계점에 도달하면 다음 API 호출이 이루어진다.', async () => {
        render(
            <RenderWithQuery>
                <ClientComponent />
            </RenderWithQuery>
        );

        await waitFor(() => {
            expect(screen.getByText('제목1')).toBeInTheDocument();

            expect(screen.getByAltText('제목1')).toHaveAttribute(
                'src',
                '/public/list1.jpg'
            );
        });

        // IntersectionObserver 콜백 호출 시뮬레이션
        const [callback] = window.IntersectionObserver.mock.calls[0];
        const entry = { isIntersecting: true };
        callback([entry]);

        await waitFor(() => {
            expect(screen.getByText('제목13')).toBeInTheDocument();
            expect(screen.getByAltText('제목13')).toHaveAttribute(
                'src',
                '/public/list13.jpg'
            );
        });
    });
});
