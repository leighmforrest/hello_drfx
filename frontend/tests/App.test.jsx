import { render, screen, waitFor } from "@testing-library/react";
import { http } from "msw";

import App from "../src/App";
import { BASE_URL } from "../settings";
import { server } from "./__mocks__/server";
import { expect } from "vitest";


describe("App", () => {
  it("renders", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
  });

  it("displays error when error status", async () => {
    server.use(
      http.get(`${BASE_URL}`, async () => {
        return HttpResponse.json({}, { status: 500 });
      })
    );
    render(<App />);

    await waitFor(() => {
            expect(screen.getByText(/unable. malfunction. need input./i)).toBeInTheDocument()

    });
  });
});
