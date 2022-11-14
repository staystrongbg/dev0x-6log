import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    setIsScroll(window.pageYOffset > 0 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    isScroll,
  };
};
export default useScroll;
