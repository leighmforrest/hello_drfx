// eslint-disable-next-line no-unused-vars
import { mockUserContext } from '../__mocks__/mockUserProvider';

import UserProvider from '../../src/contexts/UserProvider'; // must come after `vi.mock`
import { MemoryRouter, Routes, Route } from 'react-router';
import { render, screen } from '@testing-library/react';

import BaseLayout from '../../src/layouts/BaseLayout';
import MainContainer from '../../src/components/MainContainer';
import ThemeProvider from '../../src/contexts/ThemeProvider';

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
});
