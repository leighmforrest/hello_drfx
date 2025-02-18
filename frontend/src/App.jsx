import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BaseLayout from "./components/layout/BaseLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
