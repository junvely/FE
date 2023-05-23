import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "pages/MainPage";
import "styles/scss/base/reset.scss";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
