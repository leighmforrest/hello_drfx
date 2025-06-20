import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';

import ThemeProvider from './contexts/ThemeProvider';
import UserProvider from './contexts/UserProvider';

import BaseLayout from './layouts/BaseLayout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import PasswordResetConfirm from './pages/PasswordResetConfirm';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PasswordRestRequest from './pages/PasswordResetRequest';

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route element={<BaseLayout />}>
              {/* Private routes */}
              <Route element={<PrivateRoute />}>
                <Route index element={<IndexPage />} />
              </Route>

              {/* Public routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
              </Route>
              <Route path="/password/reset" element={<PublicRoute />}>
                <Route index element={<PasswordRestRequest />} />
                <Route
                  path="/password/reset/confirm/:uid/:token"
                  element={<PasswordResetConfirm />}
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
