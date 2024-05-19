import { http, HttpResponse } from 'msw';
import {
    mockreturn1,
    mockreturn2,
    searchmockreturn1,
    searchmockreturn2,
} from './testExample';
import { API } from '@/services/API';

export const ListPagehandlers = [
    http.get(`${API}`, ({ request }) => {
        const url = new URL(request.url);
        const page = url.searchParams.get('page');

        let data = mockreturn1;
        if (page === '1') {
            data = mockreturn2;
        }
        return HttpResponse.json(data);
    }),
    http.get(`${API}/search`, ({ request }) => {
        const url = new URL(request.url);
        const keyword = url.searchParams.get('keyword');

        let data = {
            webtoons : []
        };

        if (keyword === '백련') {
            data = searchmockreturn1;
        } else if (keyword === '무련') {
            data = searchmockreturn2;
        }

        return HttpResponse.json(data);
    }),
];
