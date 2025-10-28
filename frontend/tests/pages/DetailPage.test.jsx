import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { server } from '../__mocks__/server';
import { pictureFactory } from '../__mocks__/dataStore';
import { TestUserProvider } from '../providers';
import DetailPage from '../../src/pages/DetailPage';
import { BASE_URL } from '../../settings';

const TEST_IDS = {
  LIKE_BAR: 'like-bar',
  EDIT_DELETE_BAR: 'edit-delete-bar',
  LIKE_BUTTON: 'like-button',
  UNLIKE_BUTTON: 'unlike-button',
};

const renderComponent = (pictureId) => ({
  ...render(
    <TestUserProvider path={`/${pictureId}`}>
      <Routes>
        <Route path="/:pk" element={<DetailPage />} />
      </Routes>
    </TestUserProvider>,
  ),
  user: userEvent.setup(),
});

const mockPictureGet = (picture) => {
  server.use(
    http.get(`${BASE_URL}/:pk`, ({ params }) => {
      if (params.pk === String(picture.pk)) {
        return HttpResponse.json(picture);
      } else if (params.pk === '12345') {
        return new HttpResponse(null, { status: 500 });
      }
      return new HttpResponse(null, { status: 404 });
    }),
  );
};

// Register like/unlike handlers that close over the provided picture object.
// Must be called inside the test's beforeEach so it mutates the right picture.
const registerLikeHandlers = (picture) => {
  server.use(
    http.post(`${BASE_URL}/:pk/like`, ({ params }) => {
      if (params.pk === String(picture.pk)) {
        picture.total_likes = (picture.total_likes ?? 0) + 1;
        picture.is_liked = true;
        return new HttpResponse(null, { status: 204 });
      }
      return new HttpResponse(null, { status: 404 });
    }),
    http.delete(`${BASE_URL}/:pk/like`, ({ params }) => {
      if (params.pk === String(picture.pk)) {
        picture.total_likes = (picture.total_likes ?? 0) - 1;
        picture.is_liked = false;
        return new HttpResponse(null, { status: 204 });
      }
      return new HttpResponse(null, { status: 404 });
    }),
  );
};

let picture;

describe('DetailPage', () => {
  describe('DetailPanel', () => {
    describe('authenticated users', () => {
      beforeEach(async () => {
        picture = await pictureFactory
          .props({
            is_user: () => true,
            total_likes: () => 1,
          })
          .build();

        mockPictureGet(picture);
        registerLikeHandlers(picture); // must be per-test so handlers mutate this 'picture'
      });

      it('renders the picture from API', async () => {
        renderComponent(picture.pk);

        await screen.findByRole('link', { name: picture.user.handle });
        expect(screen.getByText(picture.title)).toBeInTheDocument();
        expect(screen.getByTestId(TEST_IDS.LIKE_BAR)).toBeInTheDocument();
        expect(
          screen.getByTestId(TEST_IDS.EDIT_DELETE_BAR),
        ).toBeInTheDocument();
      });

      it('renders NotFoundPage if picture does not exist', async () => {
        renderComponent(999);
        expect(await screen.findByText(/not found/i)).toBeInTheDocument();
      });

      it('renders an error state if API returns 500', async () => {
        renderComponent('12345');
        expect(await screen.findByTestId('error-page')).toBeInTheDocument();
      });

      it.each([
        { initialLiked: false, delta: +1, expected: TEST_IDS.UNLIKE_BUTTON },
        { initialLiked: true, delta: -1, expected: TEST_IDS.LIKE_BUTTON },
      ])(
        'toggles like state (initialLiked=$initialLiked)',
        async ({ initialLiked, delta, expected }) => {
          // fresh per-test picture shape
          picture = { ...picture, is_liked: initialLiked, total_likes: 0 };
          // re-register handlers to close over new picture object
          registerLikeHandlers(picture);
          mockPictureGet(picture);

          const { user } = renderComponent(picture.pk);

          const button = await screen.findByTestId(
            initialLiked ? TEST_IDS.UNLIKE_BUTTON : TEST_IDS.LIKE_BUTTON,
          );
          await user.click(button);

          expect(screen.getByTestId('total-likes')).toHaveTextContent(
            String(picture.total_likes),
          );
          expect(screen.getByTestId(expected)).toBeInTheDocument();
        },
      );
    });

    describe('users who created picture', () => {
      beforeEach(async () => {
        picture = await pictureFactory.props({ is_user: () => true }).build();

        server.use(
          http.get(`${BASE_URL}/:pk`, () => HttpResponse.json(picture)),
          http.patch(`${BASE_URL}/:pk`, async ({ request }) => {
            const { title } = await request.json();
            picture = { ...picture, title };
            return HttpResponse.json(picture);
          }),
        );
      });

      it('renders edit and delete buttons', async () => {
        renderComponent(picture.pk);
        expect(
          await screen.findByRole('button', { name: /edit/i }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: /delete/i }),
        ).toBeInTheDocument();
      });

      it('shows form when edit button clicked', async () => {
        const { user } = renderComponent(picture.pk);
        await user.click(await screen.findByRole('button', { name: /edit/i }));
        expect(screen.getByTestId('picture-edit-form')).toBeInTheDocument();
      });

      it('resets form when reset clicked', async () => {
        const { user } = renderComponent(picture.pk);
        await user.click(await screen.findByRole('button', { name: /edit/i }));

        const textarea = await screen.findByRole('textbox');
        await user.type(textarea, 'dummy');
        await user.click(screen.getByRole('button', { name: /reset/i }));

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByText(picture.title)).toBeInTheDocument();
      });

      it('updates when update clicked', async () => {
        const { user } = renderComponent(picture.pk);
        await user.click(await screen.findByRole('button', { name: /edit/i }));

        const textarea = await screen.findByRole('textbox');
        await user.clear(textarea);
        await user.type(textarea, 'this is dummy text');
        await user.click(screen.getByRole('button', { name: /update/i }));

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByText('this is dummy text')).toBeInTheDocument();
        expect(
          screen.getByText(/the picture has been updated/i),
        ).toBeInTheDocument();
      });
    });

    describe('users who did not create picture', () => {
      beforeEach(async () => {
        picture = await pictureFactory.props({ is_user: () => false }).build();
        mockPictureGet(picture);
      });

      it('does not render edit/delete buttons', async () => {
        renderComponent(picture.pk);
        await screen.findByTestId(TEST_IDS.LIKE_BAR);
        expect(
          screen.queryByTestId(TEST_IDS.EDIT_DELETE_BAR),
        ).not.toBeInTheDocument();
      });
    });
  });
});
