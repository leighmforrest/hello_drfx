import '../__mocks__/mockApiClient';

import api from '../../src/apiClient'; // <-- mocked now

import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TestUserProvider } from '../providers';
import { testFile } from '../helpers';
import NewPicturePage from '../../src/pages/NewPicturePage';


describe('NewPicturePage', () => {
  beforeEach(() => {
    api.__mock__.post.mockReset();
    api.__mock__.get.mockReset();
  });

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
      // Simulate progress at 100%
      config.onUploadProgress?.({ loaded: 30, total: 30 });

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

  it("shows error page on error", async ()=> {
    api.__mock__.post.mockImplementation(() => {
      return Promise.reject();
    });

    const imageFile = testFile();

    const { title, picture, submit, user } = renderComponent();

    await user.type(title, 'Hello World!');
    await user.upload(picture, imageFile);
    await user.click(submit);

    expect(screen.getByText(/unable. malfunction./i)).toBeInTheDocument()
  })
});
