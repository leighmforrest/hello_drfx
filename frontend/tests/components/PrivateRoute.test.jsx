import { mockUserContext } from '../__mocks__/mockUserProvider';
import UserProvider from '../../src/contexts/UserProvider'; // must come after `vi.mock`

import { MemoryRouter, Routes, Route } from 'react-router';
import { render, screen } from '@testing-library/react';

import { useUser } from '../../src/contexts/UserProvider';
import PrivateRoute from '../../src/components/PrivateRoute';


const TestPrivatePage = () => {
  const { user } = useUser();

  return <p>{user.email}</p>;
};

describe('PrivateRoute', () => {
  beforeEach(() => {
    mockUserContext.user = null;
    mockUserContext.loading = false;
    mockUserContext.logout = vi.fn();
  });

  const renderComponent = () => {
    return {
      ...render(
        <UserProvider>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<TestPrivatePage />} />
              </Route>
              <Route path="/login" element={<p>Login Page</p>} />
              <Route path="/register" element={<p>Registration Page</p>} />
            </Routes>
          </MemoryRouter>
        </UserProvider>,
      ),
    };
  };

  it('renders private route for authenticated users', () => {
    mockUserContext.user = { email: 'testuser@example.com', id: 1 };

    renderComponent();
    expect(screen.getByText(/testuser@example.com/i)).toBeInTheDocument();
  });

  it('renders login route for unauthenticated users', () => {
    renderComponent();

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('renders spinner if user is loading', () => {
    mockUserContext.loading = true;

    renderComponent();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
