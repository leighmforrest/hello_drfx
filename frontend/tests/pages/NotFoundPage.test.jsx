import { MemoryRouter, Routes, Route } from "react-router";
import { render,screen } from "@testing-library/react";

import NotFoundPage from "../../src/pages/NotFoundPage";


describe("NotFoundPage", () => {
  const renderComponent = () => render(
    <MemoryRouter initialEntries={["/green"]}>
      <Routes>
        <Route index element={<p>Index</p>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );

  it("renders", () => {
    renderComponent()

    expect(screen.findByText(/404: page not found./i))
  })
});
