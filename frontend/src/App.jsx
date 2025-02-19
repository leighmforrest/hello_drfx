import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PasswordResetPage from "./pages/PasswordResetPage";
import BaseLayout from "./components/layout/BaseLayout";
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route element={<PrivateRoute />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/password/reset/" element={<PasswordResetPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
