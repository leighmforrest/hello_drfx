import React from "react";

const MainContainer = ({ children }) => (
  <main className="flex-1 bg-blue-200 dark:bg-blue-900 dark:text-white">
    {children}
  </main>
);

export default MainContainer;
