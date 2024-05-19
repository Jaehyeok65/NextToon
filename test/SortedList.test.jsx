import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortedListPage from '@/app/sortedlist/page';
import { useRouter } from 'next/navigation';

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
});
