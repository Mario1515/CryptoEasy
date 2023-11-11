import React from 'react';
import { Outlet } from "react-router-dom";
import Logo from '../components/Logo';

const Home = () => {
  return (
    <main className="w-full h-full flex flex-col first-letter:
     content-center items-center relative text-white font-nunito">
      <div className="w-screen h-screen bg-sky fixed -z-10"></div>

      <Logo />
        <Outlet />
    </main>
  )
}

export default Home;