import * as UserProviderModule from "../../src/contexts/UserProvider";
import { mockUserContext } from "../__mocks__/userProviderMock";

import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import Navbar from "../../src/components/Navbar";
import ThemeProvider from "../../src/contexts/ThemeProvider";

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
            <UserProviderModule.default>
              <Navbar />
            </UserProviderModule.default>
          </ThemeProvider>
        </MemoryRouter>
      ),
      hamburger: screen.queryByLabelText(/toggle menu/i),
    };
  };

  it("shows Hamburger when window is resized to mobile", async () => {
    // Initial render at desktop width
    renderComponent(1024);
    expect(screen.queryByLabelText(/toggle menu/i)).not.toBeInTheDocument();

    // Resize to mobile
    await waitFor(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event("resize"));
    });

    // Re-query and assert
    expect(screen.getByLabelText(/toggle menu/i)).toBeInTheDocument();
  });

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
    expect(navListItems).toHaveLength(4);
  });

  it("renders without hamburger in desktop mode", () => {
    const { hamburger } = renderComponent(1076);
    const navListItems = screen.getAllByRole("listitem");

    expect(hamburger).not.toBeInTheDocument();
    expect(navListItems).toHaveLength(4);
  });

  it("displays email if authenticated", async () => {
    mockUserContext.user = { email: "test@example.com" };

    const { hamburger, user } = renderComponent();
    await user.click(hamburger);

    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /log out/i })
    ).toBeInTheDocument();
  });

  it("displays spinner when loading", async () => {
    mockUserContext.loading = true;
    renderComponent(1076);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
