import { BrowserRouter, Routes, Route } from "react-router";
import IndexPage from "./pages/IndexPage";
import BaseLayout from "./layouts/BaseLayout";
import ThemeProvider from "./contexts/ThemeProvider";
import UserProvider from "./contexts/UserProvider";
import LoginPage from "./pages/LoginPage";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<BaseLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<PasswordResetConfirm />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
