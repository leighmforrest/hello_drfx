import { screen, render, waitFor } from "@testing-library/react"

import App from "./App"
import { expect } from "vitest"

describe('App', () => {
    const renderComponent = () => {
        render(<App />)
    } 

    it("should be true", async () => {
        renderComponent();
        const paragraphs = await screen.findAllByText(/./); // Finds non-empty text elements


        expect(paragraphs).toHaveLength(3);
    })
 })