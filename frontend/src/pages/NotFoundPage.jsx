import MainContainer from '../components/MainContainer';

const NotFoundPage = () => {
  return (
    <MainContainer>
      <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative">
        <div className="bg-white dark:bg-blue-950 w-full sm:max-w-3xl min-h-[inherit] m-4 flex items-center justify-center rounded-2xl">
          404: Page Not Found.
        </div>
      </section>
    </MainContainer>
  );
};

export default NotFoundPage;
