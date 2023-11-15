import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Crypto from "./components/Crypto/Crypto/Crypto";
import { CryptoProvider } from "./context/CryptoContext";


const App = () => {
  return (
    <>
    <CryptoProvider> 
      <Header />
      <Routes>
        <Route path="/" exact element={<Hero />} />
        <Route path="/crypto" exact element={<Crypto />} />
      </Routes>
      </CryptoProvider>
    </>
  );
};

export default App;