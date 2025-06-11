import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "../../src/components/forms/LoginForm";

describe("LoginForm", () => {
  const renderComponent = () => {
    const mockOnLogin = vi.fn();

    return {
      user: userEvent.setup(),
      ...render(<LoginForm onLogin={mockOnLogin} />),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      loginButton: screen.getByRole("button", { name: /login/i }),
      handler: mockOnLogin,
    };
  };

  it("renders", () => {
    const { email, password, loginButton } = renderComponent();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("Submits a valid form", async () => {
    const { user, email, password, loginButton, handler } = renderComponent();
    await user.type(email, "rod@example.com");
    await user.type(password, "T#$TP&$$678");
    await user.click(loginButton);

    expect(handler).toHaveBeenCalledWith({
      email: "rod@example.com",
      password: "T#$TP&$$678",
    });
  });

  test.each([
    ["roderick", "TestP&$$5678", /invalid email/i],
    [null, null, /email is required/i],
    [null, null, /password is required/i],
    ["rod@example.com", "P&$$", /password must be at least 6 characters/i],
  ])(
    "does not submit with %s, %s -> %s",
    async (badEmail, badPassword, errorMessage) => {
      const { user, email, password, loginButton, handler } = renderComponent();

      if (badEmail) await user.type(email, badEmail);
      if (badPassword) await user.type(password, badPassword);
      await user.click(loginButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(handler).not.toHaveBeenCalled();
    }
  );
});
