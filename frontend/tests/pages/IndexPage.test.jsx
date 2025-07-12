import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import IndexPage from '../../src/pages/IndexPage';
import { TestUserProvider } from '../providers';
import { BASE_URL } from '../../settings';
import { server } from '../__mocks__/server';

describe('IndexPage', () => {
  const renderCompnent = () => render(
      <TestUserProvider>
        <IndexPage />
      </TestUserProvider>,
    )
  it('renders', async () => {
    renderCompnent();

    await waitFor(() => {
      expect(screen.getAllByTestId("imagecard")).toHaveLength(4);
      expect(screen.getByTestId('imagecardcontainer')).toBeInTheDocument();
    });
  });

  it('displays error when error status', async () => {
    server.use(
      http.get(`${BASE_URL}`, async () => HttpResponse.error()),
    );
    renderCompnent()

    await waitFor(() => {
      expect(
        screen.getByText(/unable. malfunction. need input./i),
      ).toBeInTheDocument();
    });
  });
});
