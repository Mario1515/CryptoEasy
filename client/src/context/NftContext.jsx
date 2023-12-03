import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as commentService from "../services/commentService";
import * as nftService from "../services/nftService";

export const NftContext = createContext();


const nftReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NFTS':
            if (Array.isArray(action.payload)) {
                return action.payload.map(x => ({ ...x, comments: [] }));
            } else {
                // If action.payload is not an array or is undefined, it will return the current state
                return state;
            }
        case 'ADD_NFT':
                return [...state, action.payload];
        case 'FETCH_NFT_DETAILS':
        case 'EDIT_NFT':
            return state.map(x => x._id === action.nftId ? action.payload : x);
        case 'ADD_COMMENT':return state.map(x =>
            x._id === action.nftId
              ? {
                  ...x,
                  comments: [
                    ...x.comments,
                    {
                    username: action.username,
                    text: action.payload,
                    timestamp: action.timestamp,
                    },
                  ],
                }
              : x
          );
        case 'REMOVE_NFT':
            return state.filter(x => x._id !== action.nftId);
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

    const fetchNftDetails = async (nftId) => {
        try {
          const nftDetails = await nftService.getOne(nftId);
          const nftComments = await commentService.getNftById(nftId);

          console.log(`this is nft comments ${JSON.stringify(nftComments)}`);
      
          dispatch({
            type: 'FETCH_NFT_DETAILS',
            payload: {
              ...nftDetails,
              comments: nftComments.map(x => ({ username: x.user.username, text: x.text, timestamp: x.timestamp })),
            },
            nftId,
          });
        } catch (error) {
          console.error(`Error fetching nft details: ${error}`);
        }
      };

    const addComment = (nftId, comment) => {
        dispatch({
          type: 'ADD_COMMENT',
          payload: comment.text,
          nftId,
          username: comment.username,
          timestamp: comment.timestamp,
        });
      };

    const nftAdd = (nftData) => {
        dispatch({
            type: 'ADD_NFT',
            payload: nftData,
        })

        navigate('/allnfts');
    };

    const nftEdit = (nftId, nftData) => {
        
        dispatch({
            type: 'EDIT_NFT',
            payload: nftData,
            nftId,
        });
    };

    const nftRemove = (nftId) => {
        dispatch({
            type: 'REMOVE_NFT',
            nftId
        })
    };

    return (
        <NftContext.Provider value={{
            fetchNftDetails,
            selectNft,
            nftAdd,
            nftEdit,
            addComment,
            nftRemove
        }}>
            {children}
        </NftContext.Provider>
    );
}