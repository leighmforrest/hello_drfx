import * as UserProviderModule from '../../src/contexts/UserProvider';
import { mockUserContext } from '../__mocks__/userProviderMock';

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
            <UserProviderModule.default>
              <Routes>
                <Route element={<BaseLayout />}>
                  <Route path="/" element={<TestContent />} />
                </Route>
              </Routes>
            </UserProviderModule.default>
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
