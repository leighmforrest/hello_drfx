import { render,screen, fireEvent, findByText } from "@testing-library/react"
import LoginForm from "../../src/components/forms/LoginForm"
import { expect } from "vitest"
import userEvent from "@testing-library/user-event"

describe('LoginForm', () => { 
    const renderComponent = () => {
        const mockLogin = vi.fn()

        return {
            ...render(<LoginForm onLogin={mockLogin} />),
            user: userEvent.setup(),
            email: screen.getByLabelText(/email/i),
            password: screen.getByLabelText(/password/i),
            submit: screen.getByRole('button', {name: /sign in/i}),
            handler: mockLogin
        }

    }

    it("renders", ()=> {
        const { email, password, submit } = renderComponent();
        
        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
    });

    it("Submits", async () => {
        const { user, email, password, submit, handler } = renderComponent()
        await user.type(email, "rod@example.com")
        await user.type(password, "T#$TP&$$678")
        await user.click(submit)

        expect(handler).toHaveBeenCalledWith({'email': "rod@example.com", 'password': "T#$TP&$$678"})
    })

    test.each([
        ["roderick", "T#$TP&$$678", /invalid email/i],
        [null, null, /email is required/i],
        [null, null, /password is required/i],
        ["rod@example.com", "P&$$!", /password must be at least 6 characters/i],
      ])(
        "does not submit with %s, %s, %s",
        async (badEmail, badPassword, errorMessage) => {
          const { user, email, password, submit, handler } = renderComponent();
          
          if (badEmail) await user.type(email, badEmail);
          if (badPassword) await user.type(password, badPassword);
          await user.click(submit);
      
          expect(await screen.findByText(errorMessage)).toBeInTheDocument();
          expect(handler).not.toHaveBeenCalled();
        }
      );
      
 })