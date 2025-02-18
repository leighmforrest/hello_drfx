import { Outlet } from "react-router"
import Navbar from "../Navbar"

const BaseLayout = () => {
  return (
    <>
    <Navbar />
    <main>
        <Outlet />
    </main>
    <footer>
        &copy; Gripweed Consulting LLC
    </footer>
    </>
  )
}

export default BaseLayout