import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import * as nftService from "../services/nftService";

export const NftContext = createContext();


const nftReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NFTS':
            return action.payload.map(x => ({ ...x, comments: [] }));
        case 'EDIT_NFT':
            return state.map(x => x._id === action.nftId ? action.payload : x);
        default:
            return state;
    }
};

export const NftProvider = ({
    children,
}) => {

    const navigate = useNavigate();
    const [nfts, dispatch] = useReducer(nftReducer, []);


    useEffect(() => {
        nftService.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_NFTS',
                    payload: result
                };

                dispatch(action);
            });
    }, []);

    const selectNft = (nftId) => {
        return nfts.find(x => x._id === nftId) || {};
    };

    const nftEdit = (nftId, nftData) => {
        dispatch({
            type: 'EDIT_NFT',
            payload: nftData,
            nftId,
        });
    };

    return (
        <NftContext.Provider value={{
            selectNft,
            nftEdit
        }}>
            {children}
        </NftContext.Provider>
    );
}