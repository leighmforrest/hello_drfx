import { mockUserContext } from '../__mocks__/userProviderMock';
import UserProvider from '../../src/contexts/UserProvider'; // must come after `vi.mock`

import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

import Navbar from '../../src/components/Navbar';
import ThemeProvider from '../../src/contexts/ThemeProvider';

describe('Navbar', () => {
  beforeEach(() => {
    mockUserContext.user = null;
    mockUserContext.loading = false;
    mockUserContext.logout = vi.fn();
  });

  const setScreenWidth = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
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
        </MemoryRouter>,
      ),
      hamburger: screen.queryByLabelText(/toggle menu/i),
    };
  };

  it('shows Hamburger when window is resized to mobile', async () => {
    // Initial render at desktop width
    renderComponent(1024);
    expect(screen.queryByLabelText(/toggle menu/i)).not.toBeInTheDocument();

    // Resize to mobile
    await waitFor(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
    });

    // Re-query and assert
    expect(screen.getByLabelText(/toggle menu/i)).toBeInTheDocument();
  });

  it('renders with hamburger', () => {
    const { hamburger } = renderComponent();
    expect(hamburger).toBeInTheDocument();
  });

  it('renders with no menu initially when in mobile', () => {
    renderComponent();
    const navItems = screen.getByRole('list');
    expect(navItems).toHaveClass('opacity-0');
  });

  it('toggles menu visibility after hamburger click', async () => {
    const { hamburger, user } = renderComponent();

    await user.click(hamburger);
    const navItems = await screen.findByRole('list');
    const navListItems = await screen.findAllByRole('listitem');
    expect(navItems).toHaveClass('opacity-100');
    expect(navListItems).toHaveLength(3);
  });

  it('renders without hamburger in desktop mode', () => {
    const { hamburger } = renderComponent(1076);
    const navListItems = screen.getAllByRole('listitem');

    expect(hamburger).not.toBeInTheDocument();
    expect(navListItems).toHaveLength(3);
  });

  it('displays email if authenticated', async () => {
    mockUserContext.user = { email: 'test@example.com' };

    const { hamburger, user } = renderComponent();
    await user.click(hamburger);

    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /log out/i }),
    ).toBeInTheDocument();
  });

  it('displays spinner when loading', async () => {
    mockUserContext.loading = true;
    renderComponent(1076);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('calls logout when logout clicked', async () => {
    mockUserContext.user = { email: 'test@example.com' };

    const { hamburger, user } = renderComponent();
    await user.click(hamburger);

    const logoutButton = screen.getByRole('button', { name: /log out/i });

    await user.click(logoutButton);

    await waitFor(async () => {
      expect(mockUserContext.logout).toHaveBeenCalled();
    });
  });

  it('displays popover menu when email is clicked', async () => {
    mockUserContext.user = { email: 'test@example.com' };

    const { hamburger, user } = renderComponent();
    await user.click(hamburger);

    const email = screen.getByText(/test@example.com/i);
    await user.click(email);

    expect(screen.queryByTestId('userpopover')).toBeInTheDocument();
    expect(screen.queryByText(/password change/i)).toBeInTheDocument();

    await user.click(email);

    expect(screen.queryByTestId('userpopover')).not.toBeInTheDocument();
    expect(screen.queryByText(/password change/i)).not.toBeInTheDocument();
  });

  test.each([
    [2, null],
    [2, { email: 'rod@example.com' }],
  ])('has %d navlinks for %s', (navLinkCount, userContext) => {
    mockUserContext.user = userContext;

    renderComponent();

    const menuLinks = screen.queryAllByTestId('usermenulink');
    expect(menuLinks).toHaveLength(navLinkCount);
  });
});
