import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { User } from '../../interfaces/interfaces';

type Props = {
  children: React.ReactNode;
};

export interface UserContext {
  currentUser: User | null;
  login: (inputs: loggedUser) => void;
  logout: (inputs: User) => void;
}

const defaultValue = {
  currentUser: null,
  login: () => {},
  logout: () => {},
};

type loggedUser = {
  username: string;
  password: string;
};

export const AuthContext = createContext<UserContext>(defaultValue);

export const AuthContextProvider = ({ children }: Props) => {
  //* GET USER FROM LOCAL STORAGE
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  // {username:..,password:...}
  const login = (inputs: loggedUser): void => {
    axios
      .post('http://localhost:8000/api/auth/login', inputs)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  };

  const logout = async (inputs: User) => {
    await axios.post('http://localhost:8000/api/auth/logout', inputs);
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
