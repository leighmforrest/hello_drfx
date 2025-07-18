import ImageCardContainer from '../components/ImageCardContainer';
import Spinner from '../components/Spinner';
import { usePicturesQuery } from '../queries/usePicturesQuery';


const IndexPage = () => {
  const { data: images, isLoading, isError } = usePicturesQuery();


  if (isLoading) return <Spinner/>;

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
