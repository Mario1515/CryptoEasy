import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Crypto from "./components/Crypto/Crypto/Crypto";
import { CryptoProvider } from "./context/CryptoContext";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Logout from "./components/User/Logout/Logout";
import AllNFTs from "./components/NFTs/AllNfts/AllNFTs";
import CreateNft from "./components/NFTs/CreateNft/CreateNft.jsx";
import NFTDetails from "./components/NFTs/NftDetails/NFTDetails"
import PrivateRoute from "./components/common/PrivateRoute";
import { NftProvider } from "./context/NftContext";
import NftOwner from "./components/common/NftOwner";
import EditNft from "./components/NFTs/EditNft/EditNft";


const App = () => {
  return (
    <>
      <AuthProvider>
      <NftProvider>
        <CryptoProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Hero />} />
            <Route path="/crypto" exact element={<Crypto />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route path="/allnfts" exact element={<AllNFTs />} />
            <Route path="/nft-details/:id" exact element={<NFTDetails />} />
            <Route path="/createnft" element={(
              <PrivateRoute>
                <CreateNft />
              </PrivateRoute>
            )} />
            <Route element= {<NftOwner />}>
              <Route path="/edit/:nftId/edit" element={<EditNft />} />
            </Route>
            <Route path="*" exact element={<ErrorPage />} />
          </Routes>
          <Footer />
        </CryptoProvider>
        </NftProvider>
      </AuthProvider>
    </>
  );
};

export default App;