import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Card from './';
import {
    CheckBookMark,
    getServiceName,
    AddBookMark,
    RemoveBookMark,
} from '@/utils/Bookmark'; // 모듈 import 추가
import { fireEvent } from '@testing-library/react';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/utils/Bookmark', () => ({
    CheckBookMark: jest.fn(),
    getServiceName: jest.fn(),
    AddBookMark: jest.fn(),
    RemoveBookMark: jest.fn(),
}));

describe('카드 컴포넌트에 이미지와 텍스트들이 정상적으로 렌더링된다.', () => {
    it('renders a Card Component with correct image', () => {
        getServiceName.mockReturnValue('카카오페이지');
        render(
            <Card
                _id="123"
                img="list.jpg"
                title="백련성신"
                author="은사해탈"
                service="kakaoPage"
            />
        );

        // 이미지 요소를 찾습니다.
        const imageElement = screen.getByAltText('백련성신');

        const titleElement = screen.getByText('백련성신');

        const authorElement = screen.getByText('은사해탈');

        const serviceElement = screen.getByText('카카오페이지');

        // 이미지 요소가 존재하는지 확인합니다.
        expect(imageElement).toBeInTheDocument();

        expect(titleElement).toBeInTheDocument();

        expect(authorElement).toBeInTheDocument();

        expect(serviceElement).toBeInTheDocument();

        // 이미지의 src 속성을 확인합니다.
        expect(imageElement).toHaveAttribute('src', 'list.jpg');
    });

    it('초기 렌더링시 북마크에 등록되어 있으면 꽉 찬 하트 표시 아이콘이 렌더링된다.', () => {
        CheckBookMark.mockReturnValue(true);

        render(
            <Card
                _id="123"
                img="list.jpg"
                title="백련성신"
                author="은사해탈"
                service="카카오페이지"
            />
        );

        const HeartElement = screen.getByTestId('RedHeart');
        expect(HeartElement).toBeInTheDocument();
    });

    it('초기 렌더링시 북마크에 등록되어 있지 않으면 빈 하트 표시 아이콘이 렌더링된다.', () => {
        CheckBookMark.mockReturnValue(false);

        render(
            <Card
                _id="123"
                img="list.jpg"
                title="백련성신"
                author="은사해탈"
                service="카카오페이지"
            />
        );

        const HeartElement = screen.getByTestId('EmptyHeart');
        expect(HeartElement).toBeInTheDocument();
    });

    it('빈 하트표시 아이콘을 클릭하면 AddBookMark 함수가 호출되면서 북마크에 등록되어 꽉 찬 하트 아이콘이 렌더링된다.', async () => {
        CheckBookMark.mockReturnValue(false);

        render(
            <Card
                _id="123"
                img="list.jpg"
                title="백련성신"
                author="은사해탈"
                service="카카오페이지"
            />
        );

        const EmptyElement = screen.getByTestId('EmptyHeart');
        expect(EmptyElement).toBeInTheDocument();

        fireEvent.click(EmptyElement);
        expect(AddBookMark).toHaveBeenCalled();

        await waitFor(() => {
            const HeartElement = screen.getByTestId('RedHeart');
            expect(HeartElement).toBeInTheDocument();
        });
    });

    it('꽉 찬 하트표시 아이콘을 클릭하면 RemoveBookMark 함수가 호출되면서 북마크에서 제거되어 빈 하트 아이콘이 렌더링된다.', async () => {
        CheckBookMark.mockReturnValue(true);

        render(
            <Card
                _id="123"
                img="list.jpg"
                title="백련성신"
                author="은사해탈"
                service="카카오페이지"
            />
        );

        const HeartElement = screen.getByTestId('RedHeart');
        expect(HeartElement).toBeInTheDocument();

        fireEvent.click(HeartElement);
        expect(RemoveBookMark).toHaveBeenCalled();

        await waitFor(() => {
            const EmptyElement = screen.getByTestId('EmptyHeart');
            expect(EmptyElement).toBeInTheDocument();
        });
    });
});
