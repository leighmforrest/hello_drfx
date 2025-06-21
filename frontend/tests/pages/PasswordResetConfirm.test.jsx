import { mockNavigate } from '../__mocks__/reactRouterMock';
import { server } from '../__mocks__/server';

import { MemoryRouter } from 'react-router';
import { http } from 'msw';
import { ToastContainer } from 'react-toastify';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordResetConfirm from '../../src/pages/PasswordResetConfirm';
import { BASE_URL, endpoints } from '../../settings';

describe('PasswordResetRequest', () => {
  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter initialEntries={["/password/reset/confirm/:uid/:token"]}>
          <ToastContainer />
          <PasswordResetConfirm />
        </MemoryRouter>,
      ),
      password: screen.getByLabelText(/password/i),
      passwordResetButton: screen.getByRole('button', {
        name: /reset password/i,
      }),
      user: userEvent.setup(),
    };
  };

  it('renders', () => {
    const { password, passwordResetButton } = renderComponent();
    expect(password).toBeInTheDocument();
    expect(passwordResetButton).toBeInTheDocument();
  });

  it('successfully submits a valid form', async () => {
    const { password, passwordResetButton, user } = renderComponent();
    await user.type(password, 'Testpass1234');
    await user.click(passwordResetButton);

    await waitFor(async () => {
      expect(
        await screen.findByText(/password successfully changed. you may log in./i),
      ).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('should show error if api returns an error', async () => {
    // override the api
    server.use(
      http.post(`${BASE_URL}${endpoints.passwordResetConfirm}`, async () => {
        return HttpResponse.json({}, { status: 400 });
      }),
    );

    const { password, passwordResetButton, user } = renderComponent();

    await user.type(password, 'Testpass1234');
    await user.click(passwordResetButton);

    await waitFor(async () => {
      expect(
        await screen.findByText(
          /your password could not be changed./i,
        ),
      ).toBeInTheDocument();
    });
  });
});
