import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import RegisterForm from "../../src/components/forms/RegisterForm";

describe("RegisterForm", () => {

  const renderComponent = () => {
    const mockOnRegister = vi.fn();

    return {
      user: userEvent.setup(),
      ...render(<RegisterForm onRegister={mockOnRegister} />),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      RegisterButton: screen.getByRole("button", { name: /Register/i }),
      handler: mockOnRegister,
    };
  };

  it("renders", () => {
    const { email, password, RegisterButton } = renderComponent();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(RegisterButton).toBeInTheDocument();
  });

  it("Submits a valid form", async () => {
    const { user, email, password, RegisterButton, handler } = renderComponent();
    await user.type(email, "rod@example.com");
    await user.type(password, "T#$TP&$$678");
    await user.click(RegisterButton);

    expect(handler).toHaveBeenCalledWith({
      email: "rod@example.com",
      password: "T#$TP&$$678",
    }, expect.any(Function));
  });

  test.each([
    ["roderick", "TestP&$$5678", /invalid email/i],
    [null, null, /email is required/i],
    [null, null, /password is required/i],
    ["rod@example.com", "P&$$", /password must be at least 6 characters/i],
  ])(
    "does not submit with %s, %s -> %s",
    async (badEmail, badPassword, errorMessage) => {
      const { user, email, password, RegisterButton, handler } = renderComponent();

      if (badEmail) await user.type(email, badEmail);
      if (badPassword) await user.type(password, badPassword);
      await user.click(RegisterButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument()
      expect(handler).not.toHaveBeenCalled();
    }
  );
});
