import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SortedListPage from '@/app/sortedlist/page';
import SortedListService from '@/app/sortedlist/[service]/ClientComponent';
import SortedListFinish from '@/app/sortedlist/finish/ClientComponent';
import { useRouter } from 'next/navigation';
import { RenderWithQuery } from '@/utils/RenderWithQuery';
import { getCurrentDepth, setCurrentDepth } from '@/utils/SortedUtil';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/utils/SortedUtil', () => ({
    getCurrentDepth: jest.fn(),
    setCurrentDepth: jest.fn(),
}));

// Jest 테스트 파일 상단에 다음과 같은 코드를 추가하여 window.scrollTo 함수를 모킹합니다.
window.scrollTo = jest.fn();
window.alert = jest.fn();

describe('SortedList Component Test', () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    beforeEach(() => {
        sessionStorage.clear();
    });

    it('selectbox에서 카카오페이지 플랫폼을 선택하면 /sortedlist/kakaoPage 주소로 이동한다. ', () => {
        render(<SortedListPage />);

        // select 요소 가져오기
        const selectElement = screen.getByRole('combobox');

        // Option 1 선택
        fireEvent.change(selectElement, { target: { value: '카카오페이지' } });

        expect(pushMock).toHaveBeenCalledWith('/sortedlist/kakaoPage');
    });

    it('selectbox에서 카카오 플랫폼을 선택하면 /sortedlist/kakao 주소로 이동한다. ', () => {
        render(<SortedListPage />);

        // select 요소 가져오기
        const selectElement = screen.getByRole('combobox');

        // Option 1 선택
        fireEvent.change(selectElement, { target: { value: '카카오' } });

        expect(pushMock).toHaveBeenCalledWith('/sortedlist/kakao');
    });

    it('selectbox에서 네이버 플랫폼을 선택하면 /sortedlist/naver 주소로 이동한다. ', () => {
        render(<SortedListPage />);

        // select 요소 가져오기
        const selectElement = screen.getByRole('combobox');

        // Option 1 선택
        fireEvent.change(selectElement, { target: { value: '네이버' } });

        expect(pushMock).toHaveBeenCalledWith('/sortedlist/naver');
    });

    it('selectbox에서 완결을 선택하면 /sortedlist/finish 주소로 이동한다. ', () => {
        render(<SortedListPage />);

        // select 요소 가져오기
        const selectElement = screen.getByRole('combobox');

        // Option 1 선택
        fireEvent.change(selectElement, { target: { value: '완결' } });

        expect(pushMock).toHaveBeenCalledWith('/sortedlist/finish');
    });

    it('이동한 페이지에서 모든 데이터를 가져오기 전에는 Loading... Text가 렌더링되며 모든 데이터를 가져온 후에 데이터가 렌더링된다.', async () => {
        render(
            <RenderWithQuery>
                <SortedListService
                    service="kakao"
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('제목16')).toBeInTheDocument();
        });
    });

    it('데이터가 렌더링 된 후 더 보기 버튼을 클릭하면 다음 데이터가 추가로 렌더링된다.', async () => {
        render(
            <RenderWithQuery>
                <SortedListService
                    service="kakao"
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('제목16')).toBeInTheDocument();
            expect(screen.queryByText('제목15')).not.toBeInTheDocument();
        });

        expect(screen.getByText('더 보기')).toBeInTheDocument(); // 더 보기 버튼
        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(screen.getByText('제목15')).toBeInTheDocument();
        });
    });

    it('Session Storage에 저장된 스크롤 위치가 있다면 렌더링 시 스크롤 위치가 복원된다.', async () => {
        sessionStorage.setItem('sortedlist/kakao_scroll', '200'); //모의로 스크롤 위치 200 지정
        render(
            <RenderWithQuery>
                <SortedListService
                    service="kakao"
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );

        expect(
            JSON.parse(sessionStorage.getItem('sortedlist/kakao_scroll'))
        ).toEqual(200);

        await waitFor(() => {
            //webtoon 데이터를 가져올때까지 기다림
            expect(window.scrollTo).toHaveBeenCalled();
        });
    });

    it('SortedListServicec 컴포넌트 브라우저 환경에서 스크롤을 내리면 스크롤 위치가 Session Storage에 저장된다.', async () => {
        render(
            <RenderWithQuery>
                <SortedListService
                    service="kakao"
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        await waitFor(() => {
            expect(
                JSON.parse(sessionStorage.getItem('sortedlist/kakao_scroll'))
            ).toEqual(200);
        });
    });

    it('더 보기 버튼을 계속 클릭하여 더 이상 가져올 데이터가 없으면 알림 메시지가 발생한다.', async () => {
        getCurrentDepth.mockReturnValue(12);
        render(
            <RenderWithQuery>
                <SortedListService
                    service="kakao"
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('제목16')).toBeInTheDocument();
            expect(screen.queryByText('제목15')).not.toBeInTheDocument();
        });

        expect(screen.getByText('더 보기')).toBeInTheDocument(); // 더 보기 버튼
        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(screen.getByText('제목15')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(setCurrentDepth).toHaveBeenCalled();
        });

        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalled();
        });
    });

    it('SortedListFinish 컴포넌트를 렌더링하면 완결 웹툰만 렌더링된다.', async () => {
        sessionStorage.setItem('sortedlist/finish_scroll', '200'); //모의로 스크롤 위치 200 지정
        getCurrentDepth.mockReturnValue(1);
        render(
            <RenderWithQuery>
                <SortedListFinish defaultdepth={12} perPage={12} />
            </RenderWithQuery>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(
            JSON.parse(sessionStorage.getItem('sortedlist/finish_scroll'))
        ).toEqual(200);

        await waitFor(() => {
            expect(screen.getByText('완결1')).toBeInTheDocument();
            expect(window.scrollTo).toHaveBeenCalled();
        });

        expect(screen.getByText('더 보기')).toBeInTheDocument(); // 더 보기 버튼
        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(setCurrentDepth).toHaveBeenCalled();
        });
    });

    it('SortedListFinish 컴포넌트에서 더 보기 버튼을 눌렀을 때 더 이상 가져올 데이터가 없으면 알림이 발생한다.', async () => {
        getCurrentDepth.mockReturnValue(2);
        render(
            <RenderWithQuery>
                <SortedListFinish defaultdepth={2} perPage={12} />
            </RenderWithQuery>
        );

        await waitFor(() => {
            expect(screen.getByText('완결1')).toBeInTheDocument();
        });

        expect(screen.getByText('더 보기')).toBeInTheDocument(); // 더 보기 버튼
        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalled();
        });
    });

    it('SortedListFinish 컴포넌트에서 더 보기 버튼을 눌렀을 때 가져올 데이터가 있다면 다음 데이터를 가져온다.', async () => {
        getCurrentDepth.mockReturnValue(1);
        render(
            <RenderWithQuery>
                <SortedListFinish defaultdepth={1} perPage={12} />
            </RenderWithQuery>
        );

        await waitFor(() => {
            expect(screen.getByText('완결1')).toBeInTheDocument();
            expect(screen.queryByText('완결2')).not.toBeInTheDocument();
        });

        expect(screen.getByText('더 보기')).toBeInTheDocument(); // 더 보기 버튼
        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(screen.getByText('완결2')).toBeInTheDocument();
            expect(setCurrentDepth).toHaveBeenCalled();
        });
    });

    it('SortedListFinish 컴포넌트 브라우저 환경에서 스크롤을 내리면 스크롤 위치가 Session Storage에 저장된다.', async () => {
        render(
            <RenderWithQuery>
                <SortedListFinish
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        await waitFor(() => {
            expect(
                JSON.parse(sessionStorage.getItem('sortedlist/finish_scroll'))
            ).toEqual(200);
        });
    });
});
