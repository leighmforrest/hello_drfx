import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../src/contexts/ThemeProvider";
import DarkModeButton from "../../src/components/DarkModeButton";
import { expect } from "vitest";

describe("ThemeProvider", () => {
  const renderComponent = (childComponent) => {
    return {
      user: userEvent.setup(),
      ...render(<ThemeProvider>{childComponent}</ThemeProvider>),
      toggle: screen.getByRole("button"),
    };
  };

  it("renders", () => {
    const { toggle } = renderComponent(<DarkModeButton />);
    expect(toggle).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
    expect(screen.getByTestId("dark-mode-icon")).toBeInTheDocument();
  });

  it("switches to dark mode", async () => {
    const { user, toggle } = renderComponent(<DarkModeButton />);
    await user.click(toggle);

    expect(localStorage.getItem("darkMode")).toBe("true");
    expect(screen.getByTestId("light-mode-icon")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("switches to light mode", async () => {
    const { user, toggle } = renderComponent(<DarkModeButton />);
    localStorage.setItem("darkMode", "true");

    await user.click(toggle);

    expect(document.body).not.toHaveClass("dark");
    expect(localStorage.getItem("darkMode")).toBe("false");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(screen.getByTestId("dark-mode-icon")).toBeInTheDocument();
  });
});
