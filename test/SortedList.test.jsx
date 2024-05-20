import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SortedListPage from '@/app/sortedlist/page';
import SortedListService from '@/app/sortedlist/[service]/ClientComponent';
import { useRouter } from 'next/navigation';
import { RenderWithQuery } from '@/utils/RenderWithQuery';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('SortedList Component Test', () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

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
                    params={{
                        service: 'kakao',
                    }}
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('제목14')).toBeInTheDocument();
        });
    });

    it('데이터가 렌더링 된 후 더 보기 버튼을 클릭하면 다음 데이터가 추가로 렌더링된다.', async () => {
        render(
            <RenderWithQuery>
                <SortedListService
                    params={{
                        service: 'kakao',
                    }}
                    defaultdepth={12}
                    perPage={12}
                />
            </RenderWithQuery>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('제목14')).toBeInTheDocument();
            expect(screen.queryByText('제목13')).not.toBeInTheDocument();
        });

        expect(screen.getByText('더 보기')).toBeInTheDocument(); // 더 보기 버튼
        fireEvent.click(screen.getByText('더 보기'));

        await waitFor(() => {
            expect(screen.getByText('제목13')).toBeInTheDocument();
        });
    });
});
