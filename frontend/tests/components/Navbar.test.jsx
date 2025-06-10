import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import Navbar from "../../src/components/Navbar";

import ThemeProvider from "../../src/contexts/ThemeProvider";

const mockUserContext = {
  user: null,
  logout: vi.fn(),
  loading: false,
};

vi.mock("../../src/contexts/UserProvider", () => {
  return {
    __esModule: true, // ✅ important for default + named export
    default: ({ children }) => <>{children}</>, // mocked UserProvider that renders children directly
    useUser: () => mockUserContext,
  };
});
import * as axiosJwt from "axios-jwt";
import ApiClient from "../../src/apiClient";
import UserProvider from "../../src/contexts/UserProvider";
import { beforeEach, expect } from "vitest";

describe("Navbar", () => {
  beforeEach(() => {
    mockUserContext.user = null;
    mockUserContext.loading = false;
    mockUserContext.logout = vi.fn();
  });
  const setScreenWidth = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  };

  const renderComponent = (width = 375) => {
    setScreenWidth(width);
    return {
      user: userEvent.setup(),
      ...render(
        <MemoryRouter>
          <ThemeProvider>
            <UserProvider>
              <Navbar />
            </UserProvider>
          </ThemeProvider>
        </MemoryRouter>
      ),
      hamburger: screen.queryByLabelText(/toggle menu/i),
    };
  };

  it("renders with hamburger", () => {
    const { hamburger } = renderComponent();
    expect(hamburger).toBeInTheDocument();
  });

  it("renders with no menu initially when in mobile", () => {
    renderComponent();
    const navItems = screen.getByRole("list");
    expect(navItems).toHaveClass("opacity-0");
  });

  it("toggles menu visibility after hamburger click", async () => {
    const { hamburger, user } = renderComponent();

    await user.click(hamburger);
    const navItems = await screen.findByRole("list");
    const navListItems = await screen.findAllByRole("listitem");
    expect(navItems).toHaveClass("opacity-100");
    expect(navListItems).toHaveLength(3);
  });

  it("renders without hamburger", () => {
    const { hamburger } = renderComponent(1076);
    const navListItems = screen.getAllByRole("listitem");

    expect(hamburger).not.toBeInTheDocument();
    expect(navListItems).toHaveLength(3);
  });

  it("displays email if authenticated", async () => {
    mockUserContext.user = { email: "test@example.com"}

    const { hamburger, user } = renderComponent();
    await user.click(hamburger);
    
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
    expect(screen.getByRole("button", {name: /log out/i})).toBeInTheDocument()
  });

  it("displays spinner when loading", async () => {
    mockUserContext.loading = true
    renderComponent(1076)

    expect(screen.getByTestId("spinner")).toBeInTheDocument()
  })
});
