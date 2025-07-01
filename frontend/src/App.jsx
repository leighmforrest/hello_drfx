import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import ThemeProvider from './contexts/ThemeProvider';
import UserProvider from './contexts/UserProvider';

import BaseLayout from './layouts/BaseLayout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import PasswordResetRequest from './pages/PasswordResetRequest';
import PasswordChangePage from './pages/PasswordChangePage';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>
        <ThemeProvider>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<BaseLayout />}>
                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                  <Route index element={<IndexPage />} />
                  <Route
                    path="/password/change"
                    element={<PasswordChangePage />}
                  />
                </Route>

                {/* Public routes */}
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/password/reset" element={<PublicRoute />}>
                    <Route index element={<PasswordResetRequest />} />
                    <Route
                      path="confirm/:uid/:token"
                      element={<PasswordResetConfirm />}
                    />
                  </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
