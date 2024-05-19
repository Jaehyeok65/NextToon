import { setupServer } from 'msw/node';
import { ListPagehandlers } from './handler'; // 앞서 작성한 핸들러 함수를 가져옵니다.

// 서버를 설정합니다.
export const server = setupServer(...ListPagehandlers);

