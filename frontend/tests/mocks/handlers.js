import { http, HttpResponse } from "msw";
import { BASE_URL } from "../../settings"

export const handlers = [
    http.get(`${BASE_URL}`, () => {
        return HttpResponse.json({message: "Hello World"})
    })
]