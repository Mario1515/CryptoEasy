import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext"
import { NftContext } from "../../context/NftContext";


const NftOwner = ({ children }) => {

    const { selectNft } = useContext(NftContext);

    const { user, isAuthenticated } = useAuthContext();
    const { nftId } = useParams();

    const currentNft = selectNft(nftId);

    if (user._id !== currentNft._ownerId) {


        return <Navigate to='/allnfts' replace />
    }

    return children ? children : <Outlet />;
};

export default NftOwner;
