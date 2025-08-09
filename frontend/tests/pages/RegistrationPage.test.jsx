import { mockNavigate } from '../__mocks__/reactRouterMock';
import { server } from '../__mocks__/server';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

import RegistrationPage from '../../src/pages/RegistrationPage';
import { BASE_URL, endpoints } from '../../settings';
import { expect } from 'vitest';

describe('RegistrationPage', () => {
  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter initialEntries={['/register']}>
          <ToastContainer />
          <Routes>
            <Route index element={<p>Index</p>} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </MemoryRouter>,
      ),
      user: userEvent.setup(),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      handle: screen.getByPlaceholderText(/enter name you want/i),
      submit: screen.getByRole('button', { name: /register/i }),
    };
  };

  it('renders', () => {
    const { email, password, handle, submit } = renderComponent();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it('successfully registers', async () => {
    const { email, password, handle, submit, user } = renderComponent();
    await user.type(email, 'testuser@email.com');
    await user.type(password, 'TestPass1234');
    await user.type(handle, 'testuser');
    await user.click(submit);

    await waitFor(async () => {
      expect(
        await screen.findByText(/you have successfully registered./i),
      ).toBeInTheDocument();
      expect(mockNavigate).toBeCalledWith('/login');
    });
  });

  it('fails to register with duplicate email', async () => {
    // override msw handler
    server.use(
      http.post(`${BASE_URL}${endpoints.register}`, async () => {
        return HttpResponse.json(
          {
            email: ['user with this email address already exists.'],
          },
          { status: 400 },
        );
      }),
    );

    const { email, password, handle, submit, user } = renderComponent();
    await user.type(email, 'testuser@email.com');
    await user.type(password, 'TestPass1234');
    await user.type(handle, 'testuser');
    await user.click(submit);

    await waitFor(async () => {
      expect(
        await screen.findByText(/user with this email address already exists/i),
      ).toBeInTheDocument();
    });
  });

  it('fails to register with duplicate handle', async () => {
    // override msw handler
    server.use(
      http.post(`${BASE_URL}${endpoints.register}`, async () => {
        return HttpResponse.json(
          {
            handle: ['user with this handle already exists.'],
          },
          { status: 400 },
        );
      }),
    );

    const { email, password, handle, submit, user } = renderComponent();
    await user.type(email, 'testuser@email.com');
    await user.type(password, 'TestPass1234');
    await user.type(handle, 'testuser');
    await user.click(submit);

    await waitFor(async () => {
      expect(
        await screen.findByText(/user with this handle already exists/i),
      ).toBeInTheDocument();
    });
  });

  it('fails to register with server error', async () => {
    server.use(
      http.post(`${BASE_URL}${endpoints.register}`, async () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );

    const { email, password, handle, submit, user } = renderComponent();
    await user.type(email, 'testuser@email.com');
    await user.type(password, 'TestPass1234');
    await user.type(handle, 'testuser');
    await user.click(submit);

    expect(
      await screen.findByText(/Registration failed. Please try again./i),
    ).toBeInTheDocument();
  });
});
