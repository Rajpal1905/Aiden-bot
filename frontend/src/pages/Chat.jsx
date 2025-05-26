import React, { useRef, useState, useContext } from 'react';
import { IoMdSend } from 'react-icons/io';
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { sendChatRequest } from '../service/operations/authApi';
import { AuthContext } from '../context/AuthContext';
import { ChatItem } from '../components/ChatItem';

export const Chat = () => {
  const inputRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]); 
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    const content = inputRef.current?.value;

    if (!content) {
      alert("Please enter a message.");
      return;
    }

    inputRef.current.value = "";
    const newMessage = { message: content, isUser: true };
    setChatMessages((prev) => [...prev, newMessage]);

    if (user) {
      try {
        const chatData = await sendChatRequest(content);
        console.log("Response data:->", chatData);

        if (chatData && chatData.chats) {
          const botResponse = { message: chatData.chats, isUser: false };
          setChatMessages((prev) => [...prev, botResponse]);
        } else {
          console.log("Error: No data returned from the API");
          alert("Error: No response from the server.");
        }
      } catch (error) {
        console.error("API request failed:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const clearConversation = () => {
    setChatMessages([]);
  };

  return (
    <div className="flex w-full h-full mt-3 gap-3">
      <div className="hidden w-[20%] md:flex sm:flex-none flex-col flex-[0.2]">
        <div className="flex h-[80%] bg-[#111D27] rounded-lg flex-col mt-3">
          <div className="mx-auto my-2 bg-white text-black font-bold rounded-full w-14 h-14 flex items-center justify-center">
            user
          </div>
          <p className="mx-auto font-sans">You are talking to a chatBOT</p>
          <p className="mx-auto font-sans my-4 p-3">
            You can ask questions about Knowledge, Business, Advice, Education, etc. But avoid sharing personal information.
          </p>
          <button
            onClick={clearConversation}
            className="w-[210px] s:w-[150px] my-auto p-2 text-white font-bold rounded-lg mx-auto bottom-1 bg-red-300 hover:bg-red-400"
          >
            CLEAR CONVERSATION
          </button>
        </div>
      </div>

      <div className="flex flex-col px-3 flex-[1] md:flex-[0.8] sm:flex-[1]">
        <h2 className="text-center text-4xl text-white mb-2 mx-auto">GPT -3.5 Turbo</h2>
        <div className="w-full h-[70vh] rounded-lg mx-auto flex flex-col overflow-x-hidden overflow-y-auto scroll-smooth">
          {chatMessages.map((msg, idx) => (
            <ChatItem key={idx} message={msg.message} isUser={msg.isUser} />
          ))}
        </div>  
        <div className="flex w-full p-3 rounded-xl bg-[#111B27] mx-auto">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent p-2 border-1  text-white text-[calc(1vw+15px)]"
          />
          <button onClick={handleSubmit} className=" ml-2 text-white ">
            <IoMdSend  className=' text-2xl' />
          </button>
        </div>
      </div>
    </div>
  );
};
