import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "./components/layout/BaseLayout";
import AuthProvider from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

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
              <Route path="/password/reset/:uid/:token" element={<PasswordResetConfirmPage />}/>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
