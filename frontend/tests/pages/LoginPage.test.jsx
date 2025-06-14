import { mockNavigate } from "../__mocks__/reactRouterMock";

import { MemoryRouter } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import LoginPage from "../../src/pages/LoginPage";
import UserProvider from "../../src/contexts/UserProvider";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

describe("LoginPage", () => {
  beforeEach(() => localStorage.clear());

  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter>
          <ToastContainer />
          <UserProvider>
            <LoginPage />
          </UserProvider>
        </MemoryRouter>
      ),
      user: userEvent.setup(),
      email: screen.getByLabelText(/email/i),
      password: screen.getByLabelText(/password/i),
      submit: screen.getByRole("button", { name: /login/i }),
    };
  };
  it("renders", () => {
    const { email, password, submit } = renderComponent();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  it("successfully logs in", async () => {
    const { user, email, password, submit } = renderComponent();

    await user.type(email, "testuser@example.com");
    await user.type(password, "T3$TP&$$123");
    await user.click(submit);

    await waitFor(async () => {
      const tokens = JSON.parse(localStorage.getItem("auth-tokens-test"));
      
      await screen.findByText(/testuser@example.com has been authenticated./i);
      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
      expect(mockNavigate).toBeCalledWith("/");
    });
  });

  it("fails to log in", async () => {
    const { user, email, password, submit } = renderComponent();

    await user.type(email, "baduser@example.com");
    await user.type(password, "password");
    await user.click(submit);

    await waitFor(async () => {
      expect(localStorage.getItem("auth-tokens-test")).not.toBeTruthy();
      await screen.findByText(
        /baduser@example.com could not be authenticated./i
      );
      expect(mockNavigate).not.toBeCalledWith("/");
    });
  });
});
