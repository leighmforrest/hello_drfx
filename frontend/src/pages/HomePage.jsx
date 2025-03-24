import { useEffect, useState } from "react";
import ApiClient from "../ApiClient";

const HomePage = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ApiClient.get("/");
        setMessage(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center">
      <div className="w-full m-1.5 md:w-8/12 md:m-0 bg-amber-50 text-center p-8 rounded-lg shadow-md">
        {isLoading ? (
          <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
        ) : isError ? (
          <h1 className="text-2xl font-bold text-red-600">Error fetching data</h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{message}</h1>
            <p className="mt-2">This is a journey into sound!</p>
            <p className="mt-1">If you can read this, nginx should be up and running!</p>
          </>
        )}
      </div>
    </section>
  );
};

export default HomePage;
