import React from "react";

const HomePage = () => {
  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center">
      <div className="w-full m-1.5 md:w-8/12 md:m-0 bg-amber-50 text-center p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Hello World!</h1>
        <p className="mt-2">This is a journey into sound!</p>
        <p className="mt-1">If you can read this, nginx should be up and running!</p>
      </div>
    </section>
  );
};

export default HomePage;
