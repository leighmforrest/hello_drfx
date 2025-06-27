import { mockNavigate } from '../__mocks__/reactRouterMock';
import { server } from '../__mocks__/server';

import { MemoryRouter, Route, Routes } from 'react-router';
import { http, HttpResponse } from 'msw';
import { ToastContainer } from 'react-toastify';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordChangePage from '../../src/pages/PasswordChangePage';
import { BASE_URL, endpoints } from '../../settings';
import { expect } from 'vitest';

describe('PasswordChangePage', () => {
  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter initialEntries={['/password/change']}>
          <ToastContainer />
          <Routes>
            <Route path="/password/change" element={<PasswordChangePage />} />
            <Route index element={<p>Index</p>} />
          </Routes>
        </MemoryRouter>,
      ),
      new_password: screen.getByLabelText(/new password/i),
      current_password: screen.getByLabelText(/current password/i),
      passwordChangeButton: screen.getByRole('button', {
        name: /change password/i,
      }),
      user: userEvent.setup(),
    };
  };

  it('renders', () => {
    const { new_password, current_password, passwordChangeButton } =
      renderComponent();
    expect(new_password).toBeInTheDocument();
    expect(current_password).toBeInTheDocument();
    expect(passwordChangeButton).toBeInTheDocument();
  });

  it('successfully submits a valid form', async () => {
    const { new_password, current_password, passwordChangeButton, user } =
      renderComponent();
    await user.type(new_password, 'Testpass1234');
    await user.type(current_password, 'Pestpass1234');
    await user.click(passwordChangeButton);

    await waitFor(async () => {
      expect(
        await screen.findByText(/password successfully changed/i),
      ).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should show error if api returns an error', async () => {
    // override the api
    server.use(
      http.post(`${BASE_URL}${endpoints.passwordChange}`, async () => {
        return HttpResponse.json({}, { status: 400 });
      }),
    );

    const { current_password, new_password, passwordChangeButton, user } =
      renderComponent();

    await user.type(current_password, 'Pestpass1234');
    await user.type(new_password, 'Testpass1234');
    await user.click(passwordChangeButton);

    await waitFor(async () => {
      expect(
        await screen.findByText(/your password could not be changed./i),
      ).toBeInTheDocument();
    });
  });
});
