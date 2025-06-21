import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordResetConfirmForm from '../../src/components/forms/PasswordResetConfirmForm';

describe('PasswordResetConfirmForm', () => {
  const renderComponent = () => {
    const mockOnPasswordResetConfirm = vi.fn();

    return {
      ...render(
        <PasswordResetConfirmForm
          onPasswordResetConfirm={mockOnPasswordResetConfirm}
        />,
      ),
      password: screen.getByLabelText(/new password/i),
      passwordResetButton: screen.getByRole('button', {
        name: /reset password/i,
      }),
      handler: mockOnPasswordResetConfirm,
      user: userEvent.setup(),
    };
  };
  it('renders', () => {
    const { password, passwordResetButton } = renderComponent();

    expect(password).toBeInTheDocument();
    expect(passwordResetButton).toBeInTheDocument();
  });

  it('Submits a valid form', async () => {
    const { user, password, passwordResetButton, handler } = renderComponent();

    await user.type(password, 'testpass12345');
    await user.click(passwordResetButton);

    expect(handler).toHaveBeenCalledWith({ new_password: 'testpass12345' });
  });

  it('fails to submit an invalid form', async () => {
    const { user, password, passwordResetButton, handler } = renderComponent();

    await user.type(password, 'gre');
    await user.click(passwordResetButton);

    expect(
      screen.getByText(/password must be at least 6 characters/i),
    ).toBeInTheDocument();
    expect(handler).not.toHaveBeenCalled();
  });
});
