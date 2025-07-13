import { mockUserContext } from '../__mocks__/userProviderMock';
import UserProvider from '../../src/contexts/UserProvider'; // must come after `vi.mock`

import { MemoryRouter, Routes, Route } from 'react-router';
import { render, screen } from '@testing-library/react';

import BaseLayout from '../../src/layouts/BaseLayout';
import ThemeProvider from '../../src/contexts/ThemeProvider';
import MainContainer from '../../src/components/MainContainer';

const TestContent = () => (
  <MainContainer>
    <p>Hello World!</p>
  </MainContainer>
);

describe('BaseLayout', () => {
  const renderComponent = () => {
    return {
      ...render(
        <MemoryRouter>
          <ThemeProvider>
            <UserProvider>
              <Routes>
                <Route element={<BaseLayout />}>
                  <Route path="/" element={<TestContent />} />
                </Route>
              </Routes>
            </UserProvider>
          </ThemeProvider>
        </MemoryRouter>,
      ),
      navbar: screen.getByTestId('navbar'),
      footer: screen.getByTestId('footer'),
      mainContainer: screen.getByTestId('maincontainer'),
    };
  };

  it('renders', () => {
    const { navbar, footer, mainContainer } = renderComponent();

    expect(navbar).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(mainContainer).toBeInTheDocument();
    expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
  });

  test.each([
    [null, 2],
    [{ email: 'rod@example.com' }, 2],
  ])('has navlink for %s', (userContext, navLinkCount) => {
    mockUserContext.user = userContext;

    renderComponent();

    const menuLinks = screen.queryAllByTestId('usermenulink');
    expect(menuLinks).toHaveLength(navLinkCount);
  });
});
