import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from '../src/contexts/UserProvider';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


/**
 * TestUserProvider
 *
 * Providers needed when the full UserProvider is needed in tests.
 */

export const TestUserProvider = ({ children, path = '/' }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <UserProvider>{children}</UserProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};
