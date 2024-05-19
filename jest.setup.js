import '@testing-library/jest-dom';
import { server } from './mock/server'; // 모의 서버 import

beforeAll(() => server.listen()); // 테스트 시작 전에 모의 서버 시작
afterEach(() => server.resetHandlers()); // 각 테스트가 끝날 때마다 요청 핸들러 초기화
afterAll(() => server.close()); // 모든 테스트가 끝난 후에 모의 서버 종료
