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
import AllNFTs from "./components/NFTs/AllNFTs/AllNFTs";
import CreateNFT from "./components/NFTs/CreateNFT/CreateNFT";
import NFTDetails from "./components/NFTs/NFTDetails/NFTDetails"
import PrivateRoute from "./components/common/PrivateRoute";

//import { AuthContext } from "../src/context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
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
                <CreateNFT />
              </PrivateRoute>
            )} />
            <Route path="*" exact element={<ErrorPage />} />
          </Routes>
          <Footer />
        </CryptoProvider>
      </AuthProvider>
    </>
  );
};

export default App;