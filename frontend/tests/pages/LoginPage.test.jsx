import { mockNavigate } from '../__mocks__/reactRouterMock';

import { MemoryRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';

import LoginPage from '../../src/pages/LoginPage';
import { TestUserProvider } from '../providers';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

describe('LoginPage', () => {
  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter>
          <ToastContainer />
          <TestUserProvider>
            <LoginPage />
          </TestUserProvider>
        </MemoryRouter>,
      ),
      user: userEvent.setup(),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      submit: screen.getByRole('button', { name: /login/i }),
    };
  };
  it('renders', () => {
    const { email, password, submit } = renderComponent();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('successfully logs in', async () => {
    const { user, email, password, submit } = renderComponent();

    await user.type(email, 'testuser@example.com');
    await user.type(password, 'T3$TP&$$123');
    await user.click(submit);

    await waitFor(async () => {
      await screen.findByText(/testuser@example.com has been authenticated./i);
      expect(mockNavigate).toBeCalledWith('/');
    });
  });

  it('fails to log in', async () => {
    const { user, email, password, submit } = renderComponent();

    await user.type(email, 'baduser@example.com');
    await user.type(password, 'password');
    await user.click(submit);

    await waitFor(async () => {
      expect(localStorage.getItem('auth-tokens-test')).not.toBeTruthy();
      await screen.findByText(
        /baduser@example.com could not be authenticated./i,
      );
      expect(mockNavigate).not.toBeCalledWith('/');
    });
  });
});
