import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { server } from '../__mocks__/server';
import { TestUserProvider } from '../providers';
import DetailPage from '../../src/pages/DetailPage';
import { pictureFactory } from '../__mocks__/dataStore';
import { BASE_URL } from '../../settings';
import { describe, expect } from 'vitest';

describe('DetailPage', () => {
  let picture;

  const renderComponent = (pictureId) => {
    return {
      ...render(
        <TestUserProvider path={`/${pictureId}`}>
          <Routes>
            <Route path="/:pk" element={<DetailPage />} />
          </Routes>
        </TestUserProvider>,
      ),
      user: userEvent.setup(),
    };
  };

  describe('all authenticated users', () => {
    beforeEach(async () => {
      picture = await pictureFactory
        .props({ is_user: () => true, total_likes: () => 1 })
        .build();

      server.use(
        http.get(`${BASE_URL}/:pk`, ({ params }) => {
          if (params.pk === String(picture.pk)) {
            return HttpResponse.json(picture);
          } else if (params.pk === String('12345')) {
            return new HttpResponse(null, { status: 500 });
          }
          return new HttpResponse(null, { status: 404 });
        }),
      );

      server.use(
        http.post(`${BASE_URL}/:pk/like`, () => {
          picture.total_likes = picture.total_likes + 1;
          picture.is_liked = true;
          return new HttpResponse(null, { status: 204 });
        }),
      );

      server.use(
        http.delete(`${BASE_URL}/:pk/like`, () => {
          picture.total_likes = picture.total_likes - 1;
          picture.is_liked = false;
          return new HttpResponse(null, { status: 204 });
        }),
      );
    });

    it('renders the picture from API', async () => {
      renderComponent(picture.pk);
      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: picture.user.handle }),
        ).toBeInTheDocument();

        expect(screen.getByText(picture.title)).toBeInTheDocument();
        expect(screen.getByTestId('like-bar')).toBeInTheDocument();
        expect(screen.getByTestId('edit-delete-bar')).toBeInTheDocument();
      });
    });

    it('renders NotFoundPage if picture does not exist', async () => {
      renderComponent(999);

      await waitFor(() => {
        expect(screen.getByText(/not found/i)).toBeInTheDocument();
      });
    });

    it('renders an error state if API returns 500', async () => {
      renderComponent(String(12345));

      await waitFor(() =>
        expect(screen.getByTestId('error-page')).toBeInTheDocument(),
      );
    });

    it('shows unlike button if like button is smashed', async () => {
      picture = { ...picture, is_liked: false, total_likes: 0 };

      const totalLikes = picture.total_likes;

      const { user } = renderComponent(picture.pk);

      await waitFor(async () => {
        const likeButton = screen.getByTestId('like-button');
        expect(likeButton).toBeInTheDocument();
        await user.click(likeButton);
      });

      expect(screen.getByTestId('total-likes')).toHaveTextContent(
        totalLikes + 1,
      );
      expect(screen.getByTestId('unlike-button')).toBeInTheDocument();
    });

    it('shows like button if unlike button is smashed', async () => {
      picture = { ...picture, is_liked: true };
      const totalLikes = picture.total_likes;

      const { user } = renderComponent(picture.pk);

      await waitFor(async () => {
        const unlikeButton = screen.getByTestId('unlike-button');
        expect(unlikeButton).toBeInTheDocument();
        await user.click(unlikeButton);
      });

      expect(screen.getByTestId('total-likes')).toHaveTextContent(
        totalLikes - 1,
      );
      expect(screen.getByTestId('like-button')).toBeInTheDocument();
    });
  });

  describe('users who created picture', () => {
    beforeEach(async () => {
      picture = await pictureFactory.props({ is_user: () => true }).build();

      server.use(
        http.get(`${BASE_URL}/:pk`, () => {
          return HttpResponse.json(picture);
        }),
      );

      server.use(
        http.patch(`${BASE_URL}/:pk`, async ({ request }) => {
          const { title } = await request.json();
          picture = { ...picture, title };
          return HttpResponse.json(picture);
        }),
      );
    });

    it('should render edit and delete buttons', async () => {
      renderComponent(picture.pk);

      await waitFor(async () => {
        const deleteButton = await screen.findByRole('button', {
          name: /delete/i,
        });
        const editButton = await screen.findByRole('button', { name: /edit/i });

        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
      });
    });

    it('should render form when edit button is clicked', async () => {
      const { user } = renderComponent(picture.pk);

      await waitFor(async () => {
        const editButton = await screen.findByRole('button', { name: /edit/i });
        await user.click(editButton);

        expect(screen.getByTestId('picture-edit-form')).toBeInTheDocument();
      });
    });

    it('should reset when reset button is clicked', async () => {
      const { user } = renderComponent(picture.pk);

      await waitFor(async () => {
        const editButton = await screen.findByRole('button', { name: /edit/i });
        await user.click(editButton);
      });

      await waitFor(async () => {
        const resetButton = await screen.findByRole('button', {
          name: /reset/i,
        });
        const textarea = await screen.findByRole('textbox');

        await user.type(textarea, 'this is dummy text');
        await user.click(resetButton);

        expect(textarea).not.toBeInTheDocument();
        expect(screen.getByText(picture.title)).toBeInTheDocument();
      });
    });

    it('should update when update button is clicked', async () => {
      const { user } = renderComponent(picture.pk);

      await waitFor(async () => {
        const editButton = await screen.findByRole('button', { name: /edit/i });
        await user.click(editButton);
      });

      await waitFor(async () => {
        const updateButton = await screen.findByRole('button', {
          name: /update/i,
        });
        const textarea = await screen.findByRole('textbox');

        await user.clear(textarea);
        await user.type(textarea, 'this is dummy text');
        await user.click(updateButton);

        expect(textarea).not.toBeInTheDocument();
        expect(screen.getByText('this is dummy text')).toBeInTheDocument();
        expect(
          screen.getByText(/the picture has been updated/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe('users who did not create picture', () => {
    beforeEach(async () => {
      picture = await pictureFactory.props({ is_user: () => false }).build();

      server.use(
        http.get(`${BASE_URL}/:pk`, () => {
          return HttpResponse.json(picture);
        }),
      );
    });

    it('should not render edit and delete buttons', async () => {
      renderComponent(picture.pk);

      await waitFor(async () => {
        const editDeleteBar = screen.queryByTestId("edit-delete-bar")
        expect(editDeleteBar).not.toBeInTheDocument()

      });
    });
  });
});
