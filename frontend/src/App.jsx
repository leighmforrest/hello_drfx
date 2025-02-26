import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BaseLayout from "./layouts/BaseLayout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout/>}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
