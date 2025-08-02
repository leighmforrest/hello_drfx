import { useState } from 'react';
import ImageCardContainer from '../components/ImageCardContainer';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { usePicturesQuery } from '../queries/usePicturesQuery';
import { LIMIT } from '../../settings';


const IndexPage = () => {
  const [offset, setOffset] = useState(0)
  const { data, isLoading, isError } = usePicturesQuery({offset, limit: LIMIT});


  if (isLoading) return <Spinner/>;

  if (isError) return <h1>Unable. Malfunction. Need input.</h1>;

  const total = data.count;
  const canGoNext = offset + LIMIT < total;
  const canGoPrev = offset > 0;

  return (
    <main className='flex justify-center min-h-screen bg-blue-200 dark:bg-blue-900 dark:text-white'>
      <section className="flex max-w-full lg:max-w-4/5">
        <div className="bg-transparent w-full min-h-[inherit] m-4 rounded-2xl">
          <ImageCardContainer images={data.results} />
          <Pagination onNext={()=> canGoNext && setOffset(prev => prev + LIMIT)} 
            onPrev={() => canGoPrev && setOffset((prev) => Math.max(prev - LIMIT, 0))}
            nextDisabled={!canGoNext}
            prevDisabled={!canGoPrev}
          />
        </div>
      </section>
    </main>
  );
};

export default IndexPage;
