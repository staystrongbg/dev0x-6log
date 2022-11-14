import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //* GET USER FROM LOCAL STORAGE
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const login = (inputs) => {
    axios
      .post('/auth/login', inputs)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  };

  const logout = async (inputs) => {
    await axios.post('/auth/logout', inputs);
    setCurrentUser(null);
  };

  //* UPDATE LOCAL STORAGE ON USER CHANGE
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
