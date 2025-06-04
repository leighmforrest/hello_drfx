import { BrowserRouter, Routes, Route } from "react-router";
import IndexPage from "./pages/IndexPage";
import BaseLayout from "./layouts/BaseLayout";
import { ThemeProvider } from "./contexts/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<IndexPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
