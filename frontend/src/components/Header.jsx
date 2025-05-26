

import { AppBar, Toolbar } from '@mui/material';
import React, { useContext } from "react";
import { Logo } from './shared/Logo';
import { NavigationLink } from './shared/NavigationLink';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { logedin, logout  } = useContext(AuthContext);

  console.log("isLogged :" ,logedin)

  const navigate = useNavigate();

  return (
    <div>
      <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex" }}>
          <Logo />
          <div>
            {logedin ? (
              <>
                <NavigationLink
                  to="/chat"
                  bg="#00fffc"
                  textColor="black"
                  text="Go To Chat"
                />
                <NavigationLink
                  to="/all-chat"
                  bg="#00fffc"
                  textColor="black"
                  text="All Chats"
                />
                <NavigationLink
                  to="/"
                  bg="#51538f"
                  textColor="white"
                  text="Logout"
                  onClick={() => logout(navigate)}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  to="/login"
                  bg="#00fffc"
                  textColor="black"
                  text="Login"
                />
                <NavigationLink
                  to="/signup"
                  bg="#51538f"
                  textColor="white"
                  text="Signup"
                />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
