import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Card from '../components/Card';
import { fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));


const pushMock = jest.fn();
useRouter.mockReturnValue({ push: pushMock });

const WebtoonProps = {
    id: '123',
    thumnail: ['list.jpg'],
    title: '백련성신',
    provider: 'KAKAO_PAGE',
    fanCount: 1234,
    setWebtoons: jest.fn(),
    isEnd: false,
};

global.JSON = {
    stringify: jest.fn(),
    parse: jest.fn(),
};

window.alert = jest.fn();

const MockSetWebtoons = jest.fn();

const MocksetCategoryWebtoons = jest.fn();

const category = '목요웹툰';

describe('카드 컴포넌트에 이미지와 텍스트들이 정상적으로 렌더링된다.', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // 모든 Mock 초기화
    });

    it('카드 컴포넌트가 정상적으로 렌더링이 된다.', () => {
        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                isEnd={false}
            />
        );

        // 이미지 요소를 찾습니다.
        const imageElement = screen.getByAltText('백련성신');

        const titleElement = screen.getByText('백련성신');

        const authorElement = screen.getByText('은사해탈');

        const serviceElement = screen.getByText('카카오페이지 웹툰');

        // 이미지 요소가 존재하는지 확인합니다.
        expect(imageElement).toBeInTheDocument();

        expect(titleElement).toBeInTheDocument();

        expect(authorElement).toBeInTheDocument();

        expect(serviceElement).toBeInTheDocument();
    });

    it('초기 렌더링시 북마크에 등록되어 있으면 꽉 찬 하트 표시 아이콘이 렌더링된다.', async () => {
        const searializ = `${[WebtoonProps]}`;

        JSON.stringify.mockReturnValue(searializ);

        JSON.parse.mockReturnValue([WebtoonProps]);

        localStorage.setItem('bookmark', searializ);

        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                isEnd={false}
            />
        );

        await waitFor(() => {
            const HeartElement = screen.getByTestId('RedHeart');
            expect(HeartElement).toBeInTheDocument();
            expect(global.JSON.parse).toHaveBeenCalled();
        });
    });

    it('초기 렌더링시 북마크에 등록되어 있지 않으면 빈 하트 표시 아이콘이 렌더링된다.', async () => {
        JSON.stringify.mockReturnValue(undefined);

        JSON.parse.mockReturnValue(undefined);

        localStorage.setItem('bookmark', undefined);

        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );

        await waitFor(() => {
            const HeartElement = screen.getByTestId('EmptyHeart');
            expect(HeartElement).toBeInTheDocument();
        });
    });

    it('빈 하트표시 아이콘을 클릭하면 AddBookMark 함수가 호출되면서 북마크에 등록되어 꽉 찬 하트 아이콘이 렌더링된다.', async () => {
        JSON.stringify.mockReturnValue(undefined);

        JSON.parse.mockReturnValue(undefined);

        localStorage.setItem('bookmark', undefined);

        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );

        const EmptyElement = screen.getByTestId('EmptyHeart');
        expect(EmptyElement).toBeInTheDocument();

        fireEvent.click(EmptyElement);

        await waitFor(() => {
            const HeartElement = screen.getByTestId('RedHeart');
            expect(HeartElement).toBeInTheDocument();
            expect(window.alert).toHaveBeenCalled();
        });
    });

    it('꽉 찬 하트표시 아이콘을 클릭하면 RemoveBookMark 함수가 호출되면서 북마크에서 제거되어 빈 하트 아이콘이 렌더링된다.', async () => {
        const searializ = `${[WebtoonProps]}`;

        JSON.stringify.mockReturnValue(searializ);

        JSON.parse.mockReturnValue([WebtoonProps]);

        localStorage.setItem('bookmark', searializ);

        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );

        await waitFor(() => {
            const HeartElement = screen.getByTestId('RedHeart');
            expect(HeartElement).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('RedHeart'));

        await waitFor(() => {
            const EmptyElement = screen.getByTestId('EmptyHeart');
            expect(EmptyElement).toBeInTheDocument();
            expect(MockSetWebtoons).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalled();
        });
    });

    it('Heart Icon을 제외한 Card를 클릭하면 상세 페이지로 이동한다.', async () => {
        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );
        const TextElement = screen.getByText('백련성신');
        expect(TextElement).toBeInTheDocument();

        fireEvent.click(TextElement);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith(
                '/detail/백련성신/KAKAO_PAGE'
            );
        });
    });

    it('service Props에 따라 매치된 Text가 리턴되며 fanCount에 따라 매치된 Text가 리턴된다.', async () => {
        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO_PAGE"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );

        await waitFor(() => {
            expect(screen.getByText('카카오페이지 웹툰')).toBeInTheDocument();
        });

        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="KAKAO"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );

        await waitFor(() => {
            expect(screen.getByText('카카오 웹툰')).toBeInTheDocument();
        });

        render(
            <Card
                id="123"
                thumbnail={['/list.jpg']}
                title="백련성신"
                authors={['은사해탈']}
                provider="NAVER"
                fanCount={1234}
                updateDays={['월']}
                setWebtoons={MockSetWebtoons}
                setCategoryWebtoons={MocksetCategoryWebtoons}
                category={category}
                isEnd={false}
            />
        );

        await waitFor(() => {
            expect(screen.getByText('네이버 웹툰')).toBeInTheDocument();
        });
    });
});
