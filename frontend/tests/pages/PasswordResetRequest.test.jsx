import { mockNavigate } from '../__mocks__/reactRouterMock';
import { server } from '../__mocks__/server';

import { MemoryRouter } from 'react-router';
import { http } from 'msw';
import { ToastContainer } from 'react-toastify';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordResetRequest from '../../src/pages/PasswordResetRequest';
import { BASE_URL, endpoints } from '../../settings';

describe('PasswordResetRequest', () => {
  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter>
          <ToastContainer />
          <PasswordResetRequest />
        </MemoryRouter>,
      ),
      email: screen.getByLabelText(/email/i),
      passwordResetButton: screen.getByRole('button', {
        name: /reset password/i,
      }),
      user: userEvent.setup(),
    };
  };

  it('renders', () => {
    const { email, passwordResetButton } = renderComponent();
    expect(email).toBeInTheDocument();
    expect(passwordResetButton).toBeInTheDocument();
  });

  it('successfully submits a valid form', async () => {
    const { email, passwordResetButton, user } = renderComponent();
    await user.type(email, 'rod@example.com');
    await user.click(passwordResetButton);

    await waitFor(async () => {
      expect(
        await screen.findByText(/If your email exists/i),
      ).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  //   it('successfully submits a valid form', async () => {
  //     const { email, passwordResetButton, user } = renderComponent();
  //     await user.type(email, 'rod@example.com');
  //     await user.click(passwordResetButton);

  //     await waitFor(async () => {
  //       expect(
  //         await screen.findByText(/If your email exists/i),
  //       ).toBeInTheDocument();
  //       expect(mockNavigate).toHaveBeenCalledWith('/login');
  //     });
  //   });

  it('should show error if api returns an error', async () => {
    // override the api
    server.use(
      http.post(`${BASE_URL}${endpoints.passwordReset}`, async () => {
        return HttpResponse.json({}, { status: 400 });
      }),
    );

    const { email, passwordResetButton, user } = renderComponent();

    await user.type(email, 'rod@example.com');
    await user.click(passwordResetButton);

    await waitFor(async () => {
      expect(
        await screen.findByText(
          /your password could not be reset. please try again./i,
        ),
      ).toBeInTheDocument();
    });
  });
});
