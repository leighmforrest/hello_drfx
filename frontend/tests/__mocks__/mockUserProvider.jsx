// tests/__mocks__/mockUserProvider.js

export const mockUserContext = {
  user: null,
  logout: vi.fn(),
  loading: false,
};

// Setup mock before imports in test files
vi.mock('../../src/contexts/UserProvider', () => {
  // eslint-disable-next-line no-undef
  const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
  const queryClient = new QueryClient();
  console.log('✅ Mocked UserProvider is active');

  return {
    __esModule: true,
    default: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    useUser: () => mockUserContext,
  };
});
