import { request } from './request';

export function musicList(id) {
    return request("/playlist/detail?id=" + id)
}