import React from 'react';

/**
 * A container component for use in page components.
 */
const MainContainer = ({ children }) => (
  <main
    className="flex-1 bg-blue-200 dark:bg-blue-900 dark:text-white"
    data-testid="maincontainer"
  >
    {children}
  </main>
);

export default MainContainer;
