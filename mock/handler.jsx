import { http, HttpResponse } from 'msw';
import {
    mockreturn1,
    mockreturn2,
    mockreturn3,
    searchmockreturn1,
    searchmockreturn2,
} from './testExample';
import { API } from '@/services/API';

export const ListPagehandlers = [
    http.get(`${API}`, ({ request }) => {
        const url = new URL(request.url);
        const page = url.searchParams.get('page');
        const keyword = url.searchParams.get('keyword');
        if (page) {
            let data = mockreturn1;
            if (page === '2') {
                data = mockreturn2;
            } else if (page === '3') {
                data = mockreturn3;
            }

            return HttpResponse.json(data);
        }
        if (keyword) {
            let data = {
                webtoons: [],
            };

            if (keyword === '백련') {
                data = searchmockreturn1;
            } else if (keyword === '무련') {
                data = searchmockreturn2;
            }

            return HttpResponse.json(data);
        }
    }),
];
