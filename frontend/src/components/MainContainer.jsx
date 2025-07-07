import React from 'react';

/**
 * A container component for use in page components.
 */
const MainContainer = ({ children }) => (
  <main
    className="min-h-screen flex-1 w-full bg-blue-200 dark:bg-blue-900 dark:text-white"
    data-testid="maincontainer"
  >
    {children}
  </main>
);

export default MainContainer;
