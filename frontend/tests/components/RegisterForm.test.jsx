import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RegisterForm from '../../src/components/forms/RegisterForm';
import { expect } from 'vitest';

describe('RegisterForm', () => {
  const renderComponent = () => {
    const mockOnRegister = vi.fn();

    return {
      user: userEvent.setup(),
      ...render(<RegisterForm onRegister={mockOnRegister} />),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      handle: screen.getByPlaceholderText(/enter name you want/i),
      registerButton: screen.getByRole('button', { name: /Register/i }),
      handler: mockOnRegister,
    };
  };

  it('renders', () => {
    const { email, password, handle, registerButton } = renderComponent();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('Submits a valid form', async () => {
    const { user, email, password, handle, registerButton, handler } =
      renderComponent();
    await user.type(email, 'rod@example.com');
    await user.type(handle, 'testuser');
    await user.type(password, 'T#$TP&$$678');
    await user.click(registerButton);

    expect(handler).toHaveBeenCalledWith(
      {
        email: 'rod@example.com',
        password: 'T#$TP&$$678',
        handle: "testuser"
      },
      expect.any(Function),
    );
  });

  test.each([
    ['roderick', 'TestP&$$5678', 'stinkie', /invalid email/i],
    [null, null, null, /email is required/i],
    [null, null, null, /password is required/i],
    [null, null, null, /handle is required/i],
    ['rod@example.com', 'P&$$', null, /password must be at least 6 characters/i],
  ])(
    'does not submit with %s, %s -> %s',
    async (badEmail, badPassword, badHandle, errorMessage) => {
      const { user, email, password, registerButton, handler } =
        renderComponent();

      if (badEmail) await user.type(email, badEmail);
      if (badPassword) await user.type(password, badPassword);
      if (badHandle) await user.type(password, badHandle);

      await user.click(registerButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(handler).not.toHaveBeenCalled();
    },
  );
});
