import { mockNavigate } from '../__mocks__/reactRouterMock';
import { server } from '../__mocks__/server';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { http, HttpResponse } from 'msw';

import AccountActivationPage from '../../src/pages/AccountActivationPage';
import { BASE_URL, endpoints } from '../../settings';
import { expect } from 'vitest';

describe('AccountActivationPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/activate/Ng/THisIsSwll']}>
        <ToastContainer />
        <Routes>
          <Route
            path="/activate/:uid/:token"
            element={<AccountActivationPage />}
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('displays spinner', () => {
    renderComponent();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('navigates to /login after successful activation', async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(/your account has been confirmed/i),
      ).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('displays error message after unsuccessful login', async () => {
    server.use(
      http.post(`${BASE_URL}${endpoints.activateAccount}`, async () => {
        return HttpResponse.json({}, { status: 400 });
      }),
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/malfunction/i)).toBeInTheDocument();
    });
  });
});
