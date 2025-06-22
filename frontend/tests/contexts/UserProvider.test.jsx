import { server } from '../__mocks__/server';

import { http, HttpResponse } from 'msw';
import { setAuthTokens } from 'axios-jwt';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import { authTokens, refreshedAuthTokens } from '../constants';
import { BASE_URL, endpoints } from '../../settings';
import UserProvider, { useUser } from '../../src/contexts/UserProvider';

const setValidTokens = async () => {
  /** Set valid testing JWT tokens. */
  await setAuthTokens({
    accessToken: authTokens.access,
    refreshToken: authTokens.refresh,
  });
};

const noUserAssertions = () => {
  /** Assert that user and logout button are not in the ui. */
  expect(screen.getByText(/no user/i)).toBeInTheDocument();
  expect(screen.queryByRole('button')).toBeNull();
};

const userAssertions = () => {
  /** Assert that user and logout button are in the ui. */
  expect(screen.getByText(/testuser@example.com/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
};

const TestUserComponent = () => {
  const { user, logout } = useUser();

  const clickHandler = () => logout();

  return (
    <div>
      {user ? (
        <div>
          <button onClick={clickHandler}>Logout</button>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>no user</p>
      )}
    </div>
  );
};

describe('UserProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const renderComponent = async () => {
    return {
      ...render(
        <UserProvider>
          <TestUserComponent />
        </UserProvider>,
      ),
      user: userEvent.setup(),
    };
  };

  it('retrieves user with auth tokens', async () => {
    await setValidTokens();

    await renderComponent();

    await waitFor(() => {
      userAssertions();
    });
  });

  it('logs out', async () => {
    await setValidTokens();

    const { user } = await renderComponent();

    await waitFor(async () => {
      userAssertions();
    });

    const logoutButton = screen.getByRole('button');
    await user.click(logoutButton);

    await waitFor(() => {
      noUserAssertions();
    });
  });

  it('should logout invalid user', async () => {
    // override msw handler
    server.use(
      http.get(`${BASE_URL}${endpoints.user}`, async () => {
        return HttpResponse.json({}, { status: 401 });
      }),
    );

    await setValidTokens();
    await renderComponent();

    await waitFor(() => {
      noUserAssertions();
      expect(localStorage.length).toBe(0);
    });
  });

  it("should render 'no user' if token refresh fails", async () => {
    // set up msw handler
    server.use(
      http.post(`${BASE_URL}`, async () => {
        return HttpResponse.json({}, { status: 401 });
      }),
    );

    // set the localstorage to refreshed tokens
    await setAuthTokens({
      accessToken: refreshedAuthTokens.access,
      refreshToken: refreshedAuthTokens.refresh,
    });

    await renderComponent();

    await waitFor(() => noUserAssertions());
  });
});
