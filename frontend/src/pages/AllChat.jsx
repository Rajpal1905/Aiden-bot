import React, { useState, useEffect } from 'react';
import { UserChat } from './UserChat';
import { allChat } from '../service/operations/authApi';

export const AllChat = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            const res = await allChat();
            console.log('Fetched chats:', res);
            if (res.success && Array.isArray(res.chats)) {
                setChats(res.chats);
            } else {
                console.warn('Unexpected response format:', res);
                setChats([]);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {chats.length > 0 ? (
                chats.map((chat) => (
                    <UserChat
                        key={chat.id || chat._id} 
                        message={chat.message}
                        chatresponse={chat.chatresponse}
                    />
                ))
            ) : (
                <p>No chats found.</p>
            )}
        </div>
    );
};
