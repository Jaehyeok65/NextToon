import { render, screen } from '@testing-library/react';
import Skeleton from '@/utils/Skeleton';

describe('Skeleton Component Test', () => {
    it('Skeleton 컴포넌트가 정상적으로 렌더링된다.', () => {
        render(<Skeleton />);
        const skeletonContainer = screen.getByTestId('skeleton');
        expect(skeletonContainer).toBeInTheDocument();
    });

    it('Skeleton 컴포넌트가 올바른 수의 자식 요소를 가지고 렌더링된다.', () => {
        render(<Skeleton />);
        const skeletonContainer = screen.getByTestId('skeleton');
        expect(skeletonContainer.children.length).toBe(12); // 예상되는 자식 요소 수
    });
});
