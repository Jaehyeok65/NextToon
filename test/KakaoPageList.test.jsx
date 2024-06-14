import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ClientComponent from '@/app/list/kakaopage/ClientComponent';
import { RenderWithQuery } from '../utils/RenderWithQuery';
import { usePathname } from 'next/navigation';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

// Jest 테스트 파일 상단에 다음과 같은 코드를 추가하여 window.scrollTo 함수를 모킹합니다.
window.scrollTo = jest.fn();

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
        });

        // IntersectionObserver 콜백 호출 시뮬레이션
        const [callback] = window.IntersectionObserver.mock.calls[0];
        const entry = { isIntersecting: true };
        callback([entry]);

        await waitFor(() => {
            expect(screen.getByText('제목13')).toBeInTheDocument();
        });
    });

    it('클라이언트 컴포넌트에서 마지막으로 리턴된 배열의 길이가 12미만이라면 더 이상 추가적인 호출이 이루어지지 않는다.', async () => {
        render(
            <RenderWithQuery>
                <ClientComponent />
            </RenderWithQuery>
        );

        await waitFor(() => {
            expect(screen.getByText('제목1')).toBeInTheDocument();
        });

        // IntersectionObserver 콜백 호출 시뮬레이션
        const [callback] = window.IntersectionObserver.mock.calls[0];
        const entry = { isIntersecting: true };
        callback([entry]);

        await waitFor(() => {
            expect(screen.getByText('제목13')).toBeInTheDocument();
        });

        callback([entry]);

        await waitFor(() => {
            expect(screen.getByText('제목25')).toBeInTheDocument();
        });
    });

    it('브라우저 환경에서 스크롤시 세션 스토리지에 스크롤 위치가 저장된다.', async () => {
        usePathname.mockReturnValue('kakaoPagelist');
        render(
            <RenderWithQuery>
                <ClientComponent />
            </RenderWithQuery>
        );

        // fireEvent로 사용자 이벤트를 트리거합니다
        fireEvent.scroll(window, { target: { scrollY: 200 } });

        await waitFor(() => {
            expect(
                JSON.parse(sessionStorage.getItem('kakaoPagelist_scroll'))
            ).toEqual(200);
        });
    });

    it('세션 스토리지에 저장된 스크롤 위치가 있을 시 렌더링 시에 스크롤 위치가 복원된다.', () => {
        usePathname.mockReturnValue('kakaoPagelist');
        sessionStorage.setItem('kakaoPagelist_scroll', '200');

        render(
            <RenderWithQuery>
                <ClientComponent />
            </RenderWithQuery>
        );

        expect(window.scrollTo).toHaveBeenCalled();

        expect(
            JSON.parse(sessionStorage.getItem('kakaoPagelist_scroll'))
        ).toEqual(200);
    });
});
