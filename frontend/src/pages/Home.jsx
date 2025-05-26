import React, { useContext } from 'react'
import { HiLogout } from "react-icons/hi";

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const Home = () => {
  const navigate = useNavigate();

  const {logedin} = useContext(AuthContext)

  const clickHandler = () => {
    logedin ? navigate("/chat") : navigate("/login"); 
  };
  return (

    <div className="flex flex-col justify-center items-center text-5xl h-screen pb-22">
      <div>
      WelCome User click on
       <span className=' text-blue-500'> Go </span> and Chat
      </div>
      <button className=' flex justify-center gap-3 mt-3  hover:text-blue-400 text-3xl rounded-2xl items-center border pl-4 pr-4 pt-2 pb-2  bg-gray-700'
      onClick={clickHandler} >
        Go
        <HiLogout />
      </button>
    </div>
  )
}
