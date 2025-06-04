import { BrowserRouter, Routes, Route } from "react-router";
import IndexPage from "./IndexPage";
import BaseLayout from "./layouts/BaseLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
