import { http, HttpResponse } from "msw";
import urls from "../../src/urls";

export const handlers = [
  http.get(urls.index, () => {
    return HttpResponse.json([
      {
        pk: 1,
        author: 1,
        title: "First Post",
        body: "Hello World!",
        created: "February 25, 2025 07:40 PM",
      },
      {
        pk: 3,
        author: 1,
        title: "Second Sighting",
        body: "This is so out of sight!",
        created: "February 25, 2025 08:16 PM",
      },
      {
        pk: 4,
        author: 1,
        title: "Third Post",
        body: "This is the third post!",
        created: "February 25, 2025 08:18 PM",
      },
    ]);
  }),
];
