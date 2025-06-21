import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordResetRequestForm from '../../src/components/forms/PasswordResetRequestForm';

describe('PasswordResetRequestForm', () => {
  const renderComponent = () => {
    const mockOnPasswordResetRequest = vi.fn();

    return {
      ...render(
        <PasswordResetRequestForm
          onPasswordResetRequest={mockOnPasswordResetRequest}
        />,
      ),
      email: screen.getByLabelText(/email/i),
      passwordResetButton: screen.getByRole('button', {
        name: /reset password/i,
      }),
      handler: mockOnPasswordResetRequest,
      user: userEvent.setup(),
    };
  };
  it('renders', () => {
    const { email, passwordResetButton } = renderComponent();

    expect(email).toBeInTheDocument();
    expect(passwordResetButton).toBeInTheDocument();
  });

  it('Submits a valid form', async () => {
    const { user, email, passwordResetButton, handler } = renderComponent();

    await user.type(email, 'rod@example.com');
    await user.click(passwordResetButton);

    expect(handler).toHaveBeenCalledWith({ email: 'rod@example.com' });
  });

  it('fails to submit an invalid form', async () => {
    const { user, email, passwordResetButton, handler } = renderComponent();

    await user.type(email, 'green');
    await user.click(passwordResetButton);

    expect(handler).not.toHaveBeenCalled();
  });
});
