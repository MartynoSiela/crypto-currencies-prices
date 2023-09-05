import { useEffect, useState } from 'react';
import axios from 'axios';

function useQuery({
  url,
  onSuccess = () => {},
}) {
  if (!url) { throw new Error('url cannot be empty'); }

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getDataAsync = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      onSuccess(response.data);
    } catch (e) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => getDataAsync(), [url]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useQuery;
