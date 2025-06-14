import { http, HttpResponse } from "msw";
import { BASE_URL, endpoints } from "../../settings";


const authTokens = {
        access:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.fake_signature",
        refresh:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWZyZXNoIiwibmFtZSI6IlJlZnJlc2ggVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.fake_refresh_signature",
      }


const refreshedAuthTokens = {
  access:
    "eyJEKKKJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.fake_signature",
  refresh:
    "eyJEKKJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWZyZXNoIiwibmFtZSI6IlJlZnJlc2ggVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.fake_refresh_signature",
}

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
    console.log(refresh)
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
  http.all("*", ({ request }) => {
    console.log("🔴 Unhandled request to:", request.url);
    return new HttpResponse(null, { status: 500 });
  }),
];
