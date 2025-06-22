import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import UserMenuLink from '../../src/components/UserMenuLink';

describe('UserMenuLink', () => {
  const renderComponent = (initialEntries = ['/']) => {
    const mockOnLinkClick = vi.fn();

    return {
      ...render(
        <MemoryRouter initialEntries={initialEntries}>
          <ul>
            <UserMenuLink onLinkClick={mockOnLinkClick} to={'/'}>
              Index
            </UserMenuLink>
            <UserMenuLink onLinkClick={mockOnLinkClick} to={'/green'}>
              Green
            </UserMenuLink>
          </ul>
          <Routes>
            <Route path="/" element={<p>Index Page</p>} />
            <Route path="/green" element={<p>Green Page</p>} />
          </Routes>
        </MemoryRouter>,
      ),
      user: userEvent.setup(),
    };
  };

  it('applies active class to active link', async () => {
    renderComponent(['/']);
    const indexLink = screen.getByRole('link', { name: /index/i });
    expect(indexLink).toHaveClass('text-amber-300');
  });

  it('does not apply active class to inactive link', async () => {
    renderComponent(['/']);
    const greenLink = screen.getByRole('link', { name: /green/i });
    expect(greenLink).not.toHaveClass('text-amber-300');
  });

  it('hover class exists on all links (tailwind hover class)', async () => {
    const { user } = renderComponent(['/']);
    const indexLink = screen.getByRole('link', { name: /index/i });

    await user.hover(indexLink);
    expect(indexLink).toHaveClass('hover:text-amber-100');

    await user.unhover(indexLink);
  });
});
