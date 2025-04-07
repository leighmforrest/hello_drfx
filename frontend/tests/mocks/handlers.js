import { http, HttpResponse } from "msw";

import { BASE_URL } from "../../src/settings";

export const handlers = [
    http.get(`${BASE_URL}/`, () => {
        return HttpResponse.json("Hello World!")
    })
]