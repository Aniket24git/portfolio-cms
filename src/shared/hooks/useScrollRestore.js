import { useEffect } from 'react';

export function useScrollRestore(activePage) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activePage]);
}
