import { http, HttpResponse } from "msw";
import { BASE_URL, endpoints } from "../../settings";
import { authTokens, refreshedAuthTokens } from "../constants";




export const handlers = [
  http.get(`${BASE_URL}`, () => {
    return HttpResponse.json({ message: "Hello World" });
  }),
  http.post(`${BASE_URL}${endpoints.login}`, async ({ request }) => {
    const { email, password } = await request.json();
    if (email == "testuser@example.com" && password == "T3$TP&$$123") {
      return HttpResponse.json(authTokens);
    } else {
      return HttpResponse.json(
        {
          detail: "No active account found with the given credentials",
        },
        { status: 401 }
      );
    }
  }),
  http.post(`${BASE_URL}${endpoints.refresh}`, async ({ request }) => {
    const { refresh } = await request.json();
    if (refresh === authTokens.refresh) {
      return HttpResponse.json(refreshedAuthTokens);
    } else {
      return HttpResponse.json(
        { detail: "Token is invalid or expired" },
        { status: 401 }
      );
    }
  }),
  http.get(`${BASE_URL}${endpoints.user}`, () => {
    return HttpResponse.json({
      id: 1,
      email: "testuser@example.com",
    });
  }),
  http.post(`${BASE_URL}${endpoints.register}`,async ({ request }) => {
    const { email } = await request.json()
    return HttpResponse.json({
      id: 1,
      email,
    }, {status: 201});
  }),
  http.all("*", ({ request }) => {
    console.log("🔴 Unhandled request to:", request.url);
    return new HttpResponse(null, { status: 500 });
  }),
];
