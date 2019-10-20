import { useState, useEffect } from 'react';

// this is A CUSTOM HOOK TO reuse the fetch functionality

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(true);
      });
  }, dependencies);

  return [isLoading, fetchedData];
};
