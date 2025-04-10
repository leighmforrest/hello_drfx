import { ToastContainer } from "react-toastify";
import LoginPage from "../../src/pages/LoginPage";
import UserProvider from "../../src/contexts/UserProvider";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return { ...actual, useNavigate: () => mockNavigate };
});

describe("LoginPage", () => {
  beforeEach(() => localStorage.clear());

  const renderComponent = () => {
    return {
      ...render(
        <UserProvider>
          <ToastContainer />
          <LoginPage />
        </UserProvider>
      ),
      user: userEvent.setup(),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      submit: screen.getByRole("button", { name: /sign in/i }),
    };
  };

  it("renders", () => {
    const { email, password, submit } = renderComponent();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("Submits", async () => {
    const { user, email, password, submit, handler } = renderComponent();
    await user.type(email, "rod@example.com");
    await user.type(password, "T3$TP&$$123");
    await user.click(submit);

    await waitFor(() => {
      console.log(localStorage);
      expect(localStorage["auth-tokens-test"]).not.toBeNull();
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(screen.getByText(/user has been logged in/i)).toBeInTheDocument();
    });
  });

  it("fails to submit", async () => {
    const { user, email, password, submit } = renderComponent();
    await user.type(email, "rod@example.com");
    await user.type(password, "WrongPassword");
    await user.click(submit);

    await waitFor(() => {
      expect(localStorage["auth-tokens-test"]).not.toBeNull();
      console.log(localStorage)
      expect(mockNavigate).not.toHaveBeenCalledWith("/");
      expect(
        screen.getByText(/user could not be authenticated/i)
      ).toBeInTheDocument();
    });
  });
});
