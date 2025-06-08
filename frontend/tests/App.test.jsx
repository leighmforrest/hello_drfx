import { render, screen, waitFor } from "@testing-library/react"

import App from "../src/App"
import { expect } from "vitest"

describe('App', () => {
    it("renders",async  ()=> {
        render(<App />)

        await waitFor(()=> {
            expect(screen.getByText(/hello world/i)).toBeInTheDocument()
        })
    })
})