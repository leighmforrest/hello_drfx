export const mockUserContext = {
  user: null,
  logout: vi.fn(),
  loading: false,
};

vi.mock('../../src/contexts/UserProvider', () => {
  return {
    __esModule: true,
    default: ({ children }) => <>{children}</>,
    useUser: () => mockUserContext,
  };
});
