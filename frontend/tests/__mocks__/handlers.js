import { http, HttpResponse } from 'msw';
import { BASE_URL, endpoints } from '../../settings';
import { authTokens, refreshedAuthTokens } from '../constants';

export const handlers = [
  http.get(`${BASE_URL}`, () => {
    return HttpResponse.json([
    {
        "pk": "3d86919c-c135-4faa-a769-2062b084b1d3",
        "title": "Hello World!",
        "picture": "https://test.s3.amazonaws.com/pictures/3d86919c-c135-4faa-a769-2062b084b1d3.jpeg"
    },
    {
        "pk": "40bad992-47cc-4f31-956b-ae1e122d654e",
        "title": "lorm ipsum ladeedee sdjfaksldfj;asd'fjs;'df",
        "picture": "https://test.s3.amazonaws.com/pictures/40bad992-47cc-4f31-956b-ae1e122d654e.jpeg"
    },
    {
        "pk": "0b076b38-7144-4e21-9ad7-26780ff9a769",
        "title": "sdfasdfsdfsdfsdfdsfdsfsdfsdfdsfsdfsdfsdafadfsdfsdfsadfsdfasdfasdfsdfsadfasdfsdf",
        "picture": "https://test.s3.amazonaws.com/pictures/0b076b38-7144-4e21-9ad7-26780ff9a769.jpeg"
    },
    {
        "pk": "a72ed37e-9d12-42fa-9972-9c2b4de12e4d",
        "title": "sadfsdfasdfsdfsadfadf",
        "picture": "https://test.s3.amazonaws.com/pictures/a72ed37e-9d12-42fa-9972-9c2b4de12e4d.jpeg"
    }
]);
  }),
  http.post(`${BASE_URL}${endpoints.login}`, async ({ request }) => {
    const { email, password } = await request.json();
    if (email == 'testuser@example.com' && password == 'T3$TP&$$123') {
      return HttpResponse.json(authTokens);
    } else {
      return HttpResponse.json(
        {
          detail: 'No active account found with the given credentials',
        },
        { status: 401 },
      );
    }
  }),
  http.post(`${BASE_URL}${endpoints.refresh}`, async ({ request }) => {
    const { refresh } = await request.json();
    if (refresh === authTokens.refresh) {
      return HttpResponse.json(refreshedAuthTokens);
    } else {
      return HttpResponse.json(
        { detail: 'Token is invalid or expired' },
        { status: 401 },
      );
    }
  }),
  http.get(`${BASE_URL}${endpoints.user}`, () => {
    return HttpResponse.json({
      id: 1,
      email: 'testuser@example.com',
    });
  }),
  http.post(`${BASE_URL}${endpoints.register}`, async ({ request }) => {
    const { email } = await request.json();
    return HttpResponse.json(
      {
        id: 1,
        email,
      },
      { status: 201 },
    );
  }),
  http.post(`${BASE_URL}${endpoints.passwordReset}`, async () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.post(`${BASE_URL}${endpoints.passwordResetConfirm}`, async () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.post(`${BASE_URL}${endpoints.passwordChange}`, async () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.post(`${BASE_URL}${endpoints.pictureCreate}`, async () => {
    return HttpResponse.json({
  "pk": "d1fd0c18-4348-4b57-b95d-e37ba2e3f784",
  "title": "Hello Gorgeous",
  "picture": "https://picturemedia/pictures/d1fd0c18-4348-4b57-b95d-e37ba2e3f784.jpeg",
  "user": {
    "pk": 1,
    "email": "rod@example.com"
  }
}, {status: 201})
  }),
  http.all('*', ({ request }) => {
    console.log('🔴 Unhandled request to:', request.url);
    return new HttpResponse(null, { status: 500 });
  }),
];
