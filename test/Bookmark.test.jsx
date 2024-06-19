import { render, screen } from '@testing-library/react';
import BookmarkPage from '@/app/bookmark/page'; // 북마크 페이지 파일 경로


// useRouter 모의 설정
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const testlist = [
    {
        id: '12345',
        thumbnail: ['/public/img1.jpg'],
        title: '제목1',
        authors: ['작가1'],
        provider: '서비스1',
        fanCount: 1,
        updateDays: ['월'],
        isEnd: false,
    },
    {
        id: '12346',
        thumbnail: ['/public/img2.jpg'],
        title: '제목2',
        authors: ['작가2'],
        provider: '서비스2',
        fanCount: 2,
        updateDays: ['월'],
        isEnd: false,
    },
    {
        id: '12347',
        thumbnail: ['/public/img3.jpg'],
        title: '제목3',
        authors: ['작가3'],
        provider: '서비스3',
        fanCount: 3,
        updateDays: ['월'],
        isEnd: false,
    },
    {
        id: '12348',
        thumbnail: ['/public/img4.jpg'],
        title: '제목4',
        authors: ['작가4'],
        provider: '서비스4',
        fanCount: 4,
        updateDays: ['월'],
        isEnd: false,
    },
    {
        id: '12349',
        thumbnail: ['/public/img5.jpg'],
        title: '제목5',
        authors: ['작가5'],
        provider: '서비스5',
        fanCount: 5,
        updateDays: ['월'],
        isEnd: false,
    },
]

describe('북마크 페이지 테스트', () => {
    it('북마크 페이지에 로컬스토리지에 저장된 작품이 없을 때는 "북마크에 등록된 작품이 없습니다." 텍스트가 렌더링된다.', () => {
        render(<BookmarkPage />);

        const noBookmarkText =
            screen.getByText('북마크에 등록된 작품이 없습니다.');
        expect(noBookmarkText).toBeInTheDocument();
    });

    it('북마크 페이지에 로컬스토리지에 저장된 작품이 있을 경우에는 북마크에 저장된 작품이 렌더링된다.', () => {
        localStorage.setItem('bookmark', JSON.stringify(testlist));
        render(<BookmarkPage />);

        const webtoon1Title = screen.getByText('제목1');
        expect(webtoon1Title).toBeInTheDocument();

        const webtoon2Title = screen.getByText('제목2');
        expect(webtoon2Title).toBeInTheDocument();

        const webtoon3Title = screen.getByText('제목3');
        expect(webtoon3Title).toBeInTheDocument();

        const webtoon4Title = screen.getByText('제목4');
        expect(webtoon4Title).toBeInTheDocument();

        const webtoon5Title = screen.getByText('제목5');
        expect(webtoon5Title).toBeInTheDocument();
    });
});
