import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/main/MainPage';
import 'styles/scss/reset.scss';
import AccountPage from 'pages/account/AccountPage';
import Login from 'components/Login';
import Layout from 'components/layout/Layout';
import IntroPage from 'pages/intro/IntroPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<IntroPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/account' element={<AccountPage />}>
            <Route path='/account/login' element={<Login />}></Route>
          </Route>
        </Route>
        {/* 그 밖의 요청시 404 페이지로 보내주기 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
