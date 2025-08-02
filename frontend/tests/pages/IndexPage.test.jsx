import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import IndexPage from '../../src/pages/IndexPage';
import { TestUserProvider } from '../providers';
import { BASE_URL } from '../../settings';
import { server } from '../__mocks__/server';
import { expect } from 'vitest';

describe('IndexPage', () => {
  const renderCompnent = () => {
    return {
      ...render(
        <TestUserProvider>
          <IndexPage />
        </TestUserProvider>,
      ),
      user: userEvent.setup(),
    };
  };

  it('renders', async () => {
    renderCompnent();

    await waitFor(() => {
      expect(screen.getAllByTestId('imagecard')).toHaveLength(6);
      expect(screen.getByTestId('imagecardcontainer')).toBeInTheDocument();
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByTitle(/previous page/i)).toBeInTheDocument();
      expect(screen.getByTitle(/next page/i)).toBeInTheDocument();
    });
  });

  it('has previous button disabled on first page', async () => {
    renderCompnent();

    await waitFor(() => {
      expect(screen.getByTitle(/previous page/i)).toBeDisabled();
    });
  });

  it('can iterate through the pages until next button is disabled', async () => {
    const { user } = renderCompnent();

    // Wait for the first batch of cards
    await waitFor(() => {
      expect(screen.getAllByTestId('imagecard')).toHaveLength(6);
    });

    let nextButton = screen.getByTitle(/next page/i);

    while (!nextButton.disabled) {
      await user.click(nextButton);

      // Wait for the next set of cards to appear
      await waitFor(() => {
        const cards = screen.getAllByTestId('imagecard');
        expect(cards.length).toBeGreaterThan(0);
        expect(cards.length).toBeLessThanOrEqual(6);

        expect(screen.getByTitle(/previous page/i)).not.toBeDisabled();
      });

      nextButton = screen.getByTitle(/next page/i);
    }

    expect(nextButton).toBeDisabled();
  });

  it('can have an active previous button', async () => {
    const { user } = renderCompnent();

    await waitFor(() => {
      expect(screen.getAllByTestId('imagecard')).toHaveLength(6);
    });

    const nextButton = screen.getByTitle(/next page/i);
    await user.click(nextButton);

    await waitFor(() => {
      const prevButton = screen.getByTitle(/previous page/i);
      expect(prevButton).not.toBeDisabled();
    });

    // Optionally test that clicking "previous" loads content again
    const prevButton = screen.getByTitle(/previous page/i);
    await user.click(prevButton);

    await waitFor(() => {
      const cards = screen.getAllByTestId('imagecard');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  it('has alt text for all images', async () => {
    renderCompnent();

    await waitFor(() => {
      const images = screen.getAllByRole('img');

      images.forEach((image) => {
        expect(image).toHaveAccessibleName();
      });
    });
  });

  it('displays error when error status', async () => {
    server.use(http.get(`${BASE_URL}`, async () => HttpResponse.error()));
    renderCompnent();

    await waitFor(() => {
      expect(
        screen.getByText(/unable. malfunction. need input./i),
      ).toBeInTheDocument();
    });
  });
});
