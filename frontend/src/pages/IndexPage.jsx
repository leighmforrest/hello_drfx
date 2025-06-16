import React, { useEffect, useState } from 'react';

import api from '../apiClient';
import MainContainer from '../components/MainContainer';

const IndexPage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get('/');
        console.log(data.message);
        setMessage(data.message);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h1>Unable. Malfunction. Need input.</h1>;

  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative">
        <div className="bg-white dark:bg-blue-950 w-full sm:max-w-3xl min-h-[inherit] m-4 flex items-center justify-center rounded-2xl">
          {message}
        </div>
      </section>
    </MainContainer>
  );
};

export default IndexPage;
