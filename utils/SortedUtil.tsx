'use client';

export const getCurrentDepth = (title: string): number | null => {
    //세션 스토리지에서 현재 depth를 가져옴
    const prev = window.sessionStorage.getItem(`${title}_depth`);
    const next = prev && JSON.parse(prev);
    return next;
};

export const setCurrentDepth = (title: string, depth: number) => {
    //세션 스토리지에 현재 depth를 저장함
    window.sessionStorage.setItem(`${title}_depth`, JSON.stringify(depth));
};
