import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordChangeForm from '../../src/components/forms/PasswordChangeForm';

describe('PasswordChangeForm', () => {
  const renderComponent = () => {
    const mockOnPasswordChange = vi.fn();

    return {
      ...render(<PasswordChangeForm onPasswordChange={mockOnPasswordChange} />),
      new_password: screen.getByLabelText(/new password/i),
      current_password: screen.getByLabelText(/current password/i),
      passwordChangeButton: screen.getByRole('button', {
        name: /change password/i,
      }),
      handler: mockOnPasswordChange,
      user: userEvent.setup(),
    };
  };
  it('renders', () => {
    const { new_password, current_password, passwordChangeButton } =
      renderComponent();

    expect(current_password).toBeInTheDocument();
    expect(new_password).toBeInTheDocument();
    expect(passwordChangeButton).toBeInTheDocument();
  });

  it('Submits a valid form', async () => {
    const {
      user,
      new_password,
      current_password,
      passwordChangeButton,
      handler,
    } = renderComponent();

    await user.type(new_password, 'testpass12345');
    await user.type(current_password, 'The0ldPa$$W3rd');
    await user.click(passwordChangeButton);

    expect(handler).toHaveBeenCalledWith({
      new_password: 'testpass12345',
      current_password: 'The0ldPa$$W3rd',
    });
  });

  test.each([
    ['testPass123', '123', 1],
    ['null', 'null', 2],
    ['null', 'tesPass1234', 1],
  ])(
    'Fails to submit not submit with %s -> Minimum Length',
    async (currentPassword, newPassword, length) => {
      const {
        user,
        new_password,
        current_password,
        passwordChangeButton,
        handler,
      } = renderComponent();

      if (newPassword) await user.type(new_password, newPassword);
      if (currentPassword) await user.type(current_password, currentPassword);

      await user.click(passwordChangeButton);

      expect(
        screen.getAllByText(/password must be at least 6 characters/i),
      ).toHaveLength(length);
      expect(handler).not.toHaveBeenCalled();
    },
  );

  test.each([
    ['testPass123', null, 1],
    [null, null, 2],
    [null, 'tesPass1234', 1],
  ])(
    'Fails to submit not submit with %s -> exists',
    async (currentPassword, newPassword, length) => {
      const {
        user,
        new_password,
        current_password,
        passwordChangeButton,
        handler,
      } = renderComponent();

      if (newPassword) await user.type(new_password, newPassword);
      if (currentPassword) await user.type(current_password, currentPassword);

      await user.click(passwordChangeButton);

      expect(screen.getAllByText(/password is required/i)).toHaveLength(length);
      expect(handler).not.toHaveBeenCalled();
    },
  );
});
