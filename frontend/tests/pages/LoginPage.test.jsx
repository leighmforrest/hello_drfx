import { ToastContainer } from "react-toastify";
import LoginPage from "../../src/pages/LoginPage";
import UserProvider from "../../src/contexts/UserProvider";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router";
import { beforeEach, expect } from "vitest";


const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
 const actual = await vi.importActual("react-router");

 return {...actual,
    useNavigate: () => mockNavigate()
 }
})

describe("LoginPage", () => {
    beforeEach(()=> localStorage.clear())

  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter initialEntries={["/login"]}>
        <UserProvider>
          <ToastContainer />
          <LoginPage />
        </UserProvider>
        </MemoryRouter>
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
  });

  it("Submits", async () => {
    console.log(localStorage)
    const { user, email, password, submit, handler } = renderComponent()
    await user.type(email, "rod@example.com")
    await user.type(password, "T3$TP&$$123")
    await user.click(submit)

    await waitFor(()=> {
        console.log(localStorage)
        expect(localStorage['auth-tokens-test']).not.toBeNull()
    })
})
});
