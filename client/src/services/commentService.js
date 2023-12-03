import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/comments';

export const create = (nftId, comment, currentTime) =>
    request.post(baseUrl, { nftId, text: comment, timestamp: currentTime });


export const getNftById = (nftId) => {

    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`nftId="${nftId}"`);

    return request.get(`${baseUrl}?where=${search}&load=${relations}`);
}