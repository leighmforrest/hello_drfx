import { http, HttpResponse } from 'msw';
import { BASE_URL, endpoints } from '../../settings';
import { pictures, pictureFactory, userFactory } from './dataStore';
import { authTokens, refreshedAuthTokens } from '../constants';
import { paginatedResults } from '../helpers';

export const handlers = [
  http.get(`${BASE_URL}${endpoints.index}`, async ({ request }) => {
    const data = paginatedResults({
      allData: pictures,
      requestURL: request.url,
      endpoint: endpoints.index,
    });

    return HttpResponse.json(data);
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
  http.get(`${BASE_URL}${endpoints.user}`, async () => {
    const user = await userFactory.build();
    return HttpResponse.json(user);
  }),
  http.post(`${BASE_URL}${endpoints.register}`, async ({ request }) => {
    const { email: registerEmail, handle } = await request.json();
    console.log(handle);
    const user = userFactory.props({ email: () => registerEmail });

    return HttpResponse.json(user, { status: 201 });
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
    const picture = await pictureFactory.build();
    return HttpResponse.json(picture, { status: 201 });
  }),
  http.all('*', ({ request }) => {
    console.log('🔴 Unhandled request to:', request.url);
    return new HttpResponse(null, { status: 500 });
  }),
];
