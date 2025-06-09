import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import Navbar from "../../src/components/Navbar";

import ThemeProvider from "../../src/contexts/ThemeProvider";
import UserProvider from "../../src/contexts/UserProvider";

describe("Navbar", () => {
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
});
