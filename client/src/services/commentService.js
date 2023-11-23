import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/comments';

export const create = (nftId, comment) =>
    request.post(baseUrl, { nftId, text: comment });

export const getNftById = (nftId) => {

    console.log(`Comment service -> ${nftId}`);
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`nftId="${nftId}"`);

    return request.get(`${baseUrl}?where=${search}&load=${relations}`);
}