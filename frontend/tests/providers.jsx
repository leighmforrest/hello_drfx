import UserProvider from '../src/contexts/UserProvider';

/**
 * TestUserProvider
 *
 * Providers needed when the full UserProvider is needed in tests.
 */
export const TestUserProvider = ({ children }) => {
  // Insert Tanstack Query Client here; you will need a fresh provider for every test

  return <UserProvider>{children}</UserProvider>;
};
