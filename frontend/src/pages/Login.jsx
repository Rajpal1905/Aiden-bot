import { Box, Button, Typography } from '@mui/material'
import { CgLogIn } from "react-icons/cg";
import React, { useContext, useState } from 'react'
import robot from "../assets/Robot.png"
import { CustomizedInput } from '../components/shared/CustomizedInput'
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useContext(AuthContext);
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password ,navigate);
      toast.success("Signed in successfully!");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Box width="100%" height="100%" display="flex" flex={1}>
      <Box padding={8} mt={8} >
        <img src={robot} alt="Robot" style={{ width: "400px" }} />
      </Box>

      <Box 
        display="flex" 
        flex={{ xs: 1, md: 0.5 }} 
        justifyContent="center" 
        alignItems="center"
        padding={2} 
        ml="auto" 
        mt={16}
      >
        <form 
          onSubmit={submitHandler} 
          style={{
            margin: "auto", 
            padding: "30px", 
            boxShadow: "10px 10px 20px #000", 
            borderRadius: "10px",
            border: "none"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography 
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login 
            </Typography>
            <CustomizedInput 
              type="email" 
              name="email" 
              label="Email" 
              value={email} 
              onChange={handleEmailChange}  
            />
            <CustomizedInput 
              type="password" 
              name="password" 
              label="Password"  
              value={password} 
              onChange={handlePasswordChange} 
            />
            <Button 
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: 'black'
                },
              }}
              endIcon={<CgLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
