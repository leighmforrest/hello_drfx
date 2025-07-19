vi.mock('../../src/apiClient', () => {
  const mockPost = vi.fn();
  const mockGet = vi.fn();

  return {
    default: {
      post: mockPost,
      get: mockGet,
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
      },
      __mock__: {
        post: mockPost,
        get: mockGet,
      },
    },
  };
});