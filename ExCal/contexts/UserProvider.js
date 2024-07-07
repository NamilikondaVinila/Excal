"use client"
import React, { useState } from 'react';
import UserContext from './UserContext';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const resp = await fetch(`${baseUrl}/api/getuser`,{
        method:'POST',
        headers:{
          "token": localStorage.getItem('token'),
        }
      })
      
      const res = await resp.json();
      if(res.success){
        setUser(res.user);
        return res.user;
      }
      else{
        setUser(null);
        return null;
      }
    }

    return (
      <UserContext.Provider value={{ user, getUser, setUser }}>
        {children}
      </UserContext.Provider>
    );
};