import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleLoginResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
  };

  const handleSignOut = () => {
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};