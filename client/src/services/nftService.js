import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/nfts';

export const getAll = () => request.get(baseUrl);

export const create = (nftData) => request.post(baseUrl, nftData);

export const getOne = (nftId) => request.get(`${baseUrl}/${nftId}`);