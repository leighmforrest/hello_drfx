import { screen, render } from "@testing-library/react"

import HomePage from "./pages/HomePage"
import { expect } from "vitest"

describe('HomePage', () => {
    const renderComponent = () => {
        render(<HomePage />)
    } 

    it("should be true", async () => {
        renderComponent();
        const listItems = await screen.findAllByRole("listitem"); // Finds non-empty text elements

        expect(listItems).toHaveLength(3);
    })

    it("should show loading if in loading state", () => {
        renderComponent()
        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
 })