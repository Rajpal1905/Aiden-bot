import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import logo from '../assets/openai.png';

// Simpler response splitter – only split on paragraph breaks
const splitResponse = (response) => {
  return response
    .replace(/\r\n/g, '\n')         
    .split('\n\n')                  
    .map((para) => para.trim())
    .filter(Boolean);
};

export const ChatItem = ({ message, isUser }) => {
  const paragraphs = splitResponse(message);

  return (
    <Box sx={{ p: 2, my: 2, bgcolor: "#004d5612", borderRadius: 2 }}>
      <Typography variant="caption" color="textSecondary" sx={{ ml: 1, mb: 1, display: 'block' }}>
        {isUser ? "User" : "Bot"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: 1,
          bgcolor: "#004d56",
          borderRadius: 1
        }}
      >
        <Avatar sx={{ bgcolor: isUser ? "#1976d2" : "#004d40" }}>
          {isUser ? 'U' : <img src={logo} alt="openai" width="28px" />}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          {paragraphs.map((para, index) => (
            <Typography key={index} fontSize="16px" paragraph>
              <ReactMarkdown>{para}</ReactMarkdown>
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
