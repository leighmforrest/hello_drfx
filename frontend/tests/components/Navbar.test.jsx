import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ✅ Mock FIRST before imports that use the modules
vi.mock("axios-jwt", async () => {
  const actual = await vi.importActual("axios-jwt");
  return {
    ...actual,
    getAccessToken: vi.fn(),
    setAuthTokens: vi.fn(),
    clearAuthTokens: vi.fn(),
  };
});

vi.mock("../../src/ApiClient.js", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// ✅ Now import AFTER mocks
import * as axiosJwt from "axios-jwt";
import ApiClient from "../../src/ApiClient";
import UserProvider from "../../src/contexts/UserProvider";
import Navbar from "../../src/components/Navbar";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "../../src/contexts/ThemeProvider";

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter>
          <ThemeProvider>
            <UserProvider>
              <Navbar />
            </UserProvider>
          </ThemeProvider>
        </MemoryRouter>
      ),
      user: userEvent.setup(),
      hamburger: screen.getByTestId("hamburger-button")
    };
  };

  it("renders", () => {
    const { hamburger } = renderComponent();
    
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText(/Hello DRFX/i)).toBeInTheDocument()
    expect(hamburger).toBeInTheDocument()
  });

  it("toggles menu visibility when hamburger is clicked", async () => {
    const { user, hamburger } = renderComponent();
  
    const menu = screen.getByTestId("main-menu");
  
    // Initial state: should be hidden
    expect(menu.classList.contains("opacity-0")).toBe(true);
  
    // Click hamburger to open
    await user.click(hamburger);
    expect(menu.classList.contains("opacity-100")).toBe(true);
  
    // Click hamburger again to close
    await user.click(hamburger);
    expect(menu.classList.contains("opacity-0")).toBe(true);
  });
  

  it("displays UserMenu button if user is authenticated", async () => {
    const mockUser = { email: "rod@example.com", id: 1 };
    axiosJwt.getAccessToken.mockResolvedValue("mock-access-token");
    ApiClient.get.mockResolvedValue({ data: mockUser });

    renderComponent();

    const userMenu = await screen.findByText(/rod@example.com/i);
    const userMenuButton = await screen.findByTestId("user-menu-button")
    expect(userMenu).toBeInTheDocument();
    expect(userMenuButton).toBeInTheDocument()
  });

  it("displays UserMenu if user is authenticated", async () => {
    const mockUser = { email: "rod@example.com", id: 1 };
    axiosJwt.getAccessToken.mockResolvedValue("mock-access-token");
    ApiClient.get.mockResolvedValue({ data: mockUser });

    const {user } = renderComponent();

    const userMenuButton = await screen.findByTestId("user-menu-button")
    await user.click(userMenuButton)
    expect(screen.getByRole("button", {name: /logout/i})).toBeInTheDocument()

    await user.click(userMenuButton)
    expect(screen.queryByRole("button", {name: /logout/i})).not.toBeInTheDocument()
  });
});
