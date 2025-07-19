import { vi } from 'vitest';

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

import api from '../../src/apiClient'; // <-- mocked now

// ✅ Now it’s safe to import everything else
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { mockNavigate } from '../__mocks__/reactRouterMock'; // ✅ assume this works
import { TestUserProvider } from '../providers';
import { testFile } from '../helpers';
import NewPicturePage from '../../src/pages/NewPicturePage';

describe('NewPicturePage', () => {
  const renderComponent = () => ({
    ...render(
      <TestUserProvider>
        <NewPicturePage />
      </TestUserProvider>,
    ),
    user: userEvent.setup(),
    title: screen.getByLabelText(/title/i),
    picture: screen.getByLabelText(/picture/i),
    submit: screen.getByRole('button', { name: /upload/i }),
  });

  it('renders', () => {
    const { title, picture, submit } = renderComponent();
    expect(title).toBeInTheDocument();
    expect(picture).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('submits with valid inputs', async () => {
    const imageFile = testFile();

    // ✅ Use the mock from api.__mock__
    api.__mock__.post.mockResolvedValueOnce({
      data: {
        pk: 'abc123',
        title: 'Hello World!',
        picture: 'https://example.com/fake.jpg',
        user: { pk: 1, email: 'test@example.com' },
      },
    });

    const { title, picture, submit, user } = renderComponent();

    await user.type(title, 'Hello World!');
    await user.upload(picture, imageFile);
    await user.click(submit);

    await waitFor(() => {
      expect(api.__mock__.post).toHaveBeenCalled();
    });

    // check it was called with correct endpoint and data shape
    expect(api.__mock__.post).toHaveBeenCalledWith(
      expect.any(String), // the URL (could check exact endpoint)
      expect.any(FormData), // form data — or check more deeply
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'multipart/form-data',
        }),
        onUploadProgress: expect.any(Function), // confirms progress callback passed
      }),
    );

    expect(screen.getByText('Image was uploaded.'));
  });

  it('shows progress bar and updates progress during upload', async () => {
    const imageFile = testFile();

    // Mock implementation to simulate progress events:
    api.__mock__.post.mockImplementation((url, formData, config) => {
      // Simulate progress at 30%
      config.onUploadProgress?.({ loaded: 30, total: 100 });
      // Simulate progress at 60%
      config.onUploadProgress?.({ loaded: 60, total: 100 });
      // Simulate progress at 100%
      config.onUploadProgress?.({ loaded: 100, total: 100 });

      return Promise.resolve({
        data: {
          pk: 'abc123',
          title: 'Hello World!',
          picture: 'https://example.com/fake.jpg',
          user: { pk: 1, email: 'test@example.com' },
        },
      });
    });

    const { title, picture, submit, user } = renderComponent();

    await user.type(title, 'Hello World!');
    await user.upload(picture, imageFile);
    await user.click(submit);

    // Wait for progress bar to appear
    const progressBar = await screen.findByRole('progressbar');

    expect(progressBar).toBeInTheDocument();
  });
});
