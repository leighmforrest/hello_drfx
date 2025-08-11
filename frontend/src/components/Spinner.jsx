import MainContainer from '../components/MainContainer';

const Spinner = () => (
  <MainContainer>
    <div className="flex w-full min-h-full justify-center items-center p-4">
      <div
      className="animate-spin h-96 w-96 border-t-2 border-white rounded-full"
      data-testid="spinner"
    />
    </div>
  </MainContainer>
);

export default Spinner;
