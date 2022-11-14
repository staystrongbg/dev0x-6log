import { createContext } from 'react';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const isImgLink = (t) => {
    return t.includes('http');
  };

  return (
    <PostContext.Provider value={{ isImgLink }}>
      {children}
    </PostContext.Provider>
  );
};
