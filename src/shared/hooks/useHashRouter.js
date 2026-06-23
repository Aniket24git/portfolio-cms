import { useState, useEffect } from 'react';

export function useHashRouter(defaultRoute = 'projects') {
  const [active, setActive] = useState(defaultRoute);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || defaultRoute;
      setActive(hash);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [defaultRoute]);

  const navigate = (route) => {
    window.location.hash = route;
  };

  return { active, navigate };
}
