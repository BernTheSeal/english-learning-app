import { useEffect, useState } from 'react';

const useAuthToken = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('persist:auth');
    if (storedToken) {
      const tokenData = JSON.parse(storedToken);
      const accessToken = tokenData?.accessToken?.replace(/"/g, '');

      if (accessToken !== 'null') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};

export default useAuthToken;
