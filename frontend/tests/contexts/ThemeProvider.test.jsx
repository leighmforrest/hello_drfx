import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import ThemeProvider from '../../src/contexts/ThemeProvider';
import DarkModeButton from '../../src/components/DarkModeButton';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  const renderComponent = (childComponent) => {
    return {
      user: userEvent.setup(),
      ...render(<ThemeProvider>{childComponent}</ThemeProvider>),
      toggle: screen.getByRole('button'),
    };
  };

  it('renders', () => {
    const { toggle } = renderComponent(<DarkModeButton />);

    expect(toggle).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
    expect(screen.getByTestId('dark-mode-icon')).toBeInTheDocument();
  });

  it('loads dark mode from localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    renderComponent(<DarkModeButton />);
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByTestId('light-mode-icon')).toBeInTheDocument();
  });

  it('switches to dark mode', async () => {
    const { user, toggle } = renderComponent(<DarkModeButton />);

    await user.click(toggle);

    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(screen.getByTestId('light-mode-icon')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('switches to light mode', async () => {
    localStorage.setItem('darkMode', 'true');
    const { user, toggle } = renderComponent(<DarkModeButton />);

    await user.click(toggle);

    expect(localStorage.getItem('darkMode')).toBe('false');
    expect(screen.getByTestId('dark-mode-icon')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('toggles dark mode via keyboard', async () => {
    const { user, toggle } = renderComponent(<DarkModeButton />);
    toggle.focus();
    await user.keyboard('[Enter]');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
