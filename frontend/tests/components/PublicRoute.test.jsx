import { mockUserContext } from '../__mocks__/mockUserProvider';
import UserProvider from '../../src/contexts/UserProvider'; // must come after `vi.mock`

import PublicRoute from '../../src/components/PublicRoute';
import { MemoryRouter, Routes, Route } from 'react-router';
import { render, screen } from '@testing-library/react';

describe('PublicRoute', () => {
  beforeEach(() => {
    mockUserContext.user = null;
    mockUserContext.loading = false;
    mockUserContext.logout = vi.fn();
  });

  const renderComponent = () => {
    return {
      ...render(
        <UserProvider>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<p>Login Page</p>} />
              </Route>
              <Route path="/" element={<p>Index Page</p>} />
            </Routes>
          </MemoryRouter>
        </UserProvider>,
      ),
    };
  };

  it('renders login page for unauthenticated users', () => {
    renderComponent();

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('renders index route for authenticated users', () => {
    mockUserContext.user = { email: 'testuser@example.com', id: 1 };

    renderComponent();
    expect(screen.getByText(/index page/i)).toBeInTheDocument();
  });

  it('renders spinner if user is loading', () => {
    mockUserContext.loading = true;

    renderComponent();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
