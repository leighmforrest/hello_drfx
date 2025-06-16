import { render, screen, waitFor } from '@testing-library/react';
import { http } from 'msw';

import IndexPage from '../../src/pages/IndexPage';
import { BASE_URL } from '../../settings';
import { server } from '../__mocks__/server';
import { expect } from 'vitest';

describe('IndexPage', () => {
  it('renders', async () => {
    render(<IndexPage />);

    await waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
      expect(screen.getByTestId('maincontainer')).toBeInTheDocument();
    });
  });

  it('displays error when error status', async () => {
    server.use(
      http.get(`${BASE_URL}`, async () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );
    render(<IndexPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/unable. malfunction. need input./i),
      ).toBeInTheDocument();
    });
  });
});
