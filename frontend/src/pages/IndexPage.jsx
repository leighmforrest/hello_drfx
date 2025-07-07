import React, { useEffect, useState } from 'react';

import api from '../apiClient';
import ImageCardContainer from '../components/ImageCardContainer';


const IndexPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get('/');
        console.log(data);
        setImages(data);
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
    <main className='flex justify-center min-h-screen bg-blue-200 dark:bg-blue-900 dark:text-white'>
      <section className="flex max-w-full lg:max-w-4/5">
        <div className="bg-transparent w-full min-h-[inherit] m-4 rounded-2xl">
          <ImageCardContainer images={images} />
        </div>
      </section>
    </main>
  );
};

export default IndexPage;
