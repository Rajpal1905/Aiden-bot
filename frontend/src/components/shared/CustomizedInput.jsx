import { TextField, InputAdornment, IconButton, colors } from '@mui/material';
import React, { useState } from 'react';
import { MdOutlineVisibility,MdOutlineVisibilityOff } from "react-icons/md";

export const CustomizedInput = ({ name, label, type, value, onChange, sx, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev); 
  };

  return (
    <TextField
      margin="normal"
      name={name}
      label={label}
      type={showPassword ? 'text' : type} 
      value={value}
      onChange={onChange}
      sx={{
        width: '400px', 
        borderRadius: 2,
        fontSize: 20, 
        ...sx, 
      }}
      {...otherProps} 
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <MdOutlineVisibility color='white' /> : <MdOutlineVisibilityOff color='white'/>}
            </IconButton>
          </InputAdornment>
        ),
      }}
      slotProps={{
        inputLabel: {
          style: { color: 'white' },
        },
        htmlInput: {
          style: {
            color:"white",
            borderRadius: 6,
          }
        }
      }}
    />
  );
};
