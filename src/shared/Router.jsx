import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/main/MainPage';
import 'styles/scss/reset.scss';
import Layout from 'components/common/layout/Layout';
import IntroPage from 'pages/intro/IntroPage';
import LoginPage from 'pages/login/LoginPage';
import RedirectKakaoPage from 'pages/redirectKakao/RedirectKakaoPage';
import DetailPage from 'pages/detail/DetailPage';
import PostingPage from 'pages/posting/PostingPage';
import SignupPage from 'pages/signup/SignupPage';
import Mypage from 'pages/mypage/Mypage';
import MyPostsPage from 'pages/mypage/MyPostsPage';
import LikedPosts from 'pages/mypage/LikedPosts';
import MyReservations from 'pages/mypage/MyReservations';
import ReservationSuccessPage from 'pages/reservation/ReservationSuccessPage';
import ReservationPage from 'pages/reservation/ReservationPage';
import PrivateRoutes from './PrivateRoutes';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<IntroPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/posting' element={<PostingPage />} />
            <Route path='/mypage' element={<Mypage />}></Route>
            <Route path='/likedposts' element={<LikedPosts />}></Route>
            <Route path='/myposts' element={<MyPostsPage />}></Route>
            <Route path='/myreservations' element={<MyReservations />}></Route>
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/detail/:postId' element={<DetailPage />} />
          <Route path='/oauth/kakao' element={<RedirectKakaoPage />}></Route>
          <Route path='/mypage' element={<Mypage />}></Route>
          <Route path='/likedposts' element={<LikedPosts />}></Route>
          <Route path='/myposts' element={<MyPostsPage />}></Route>
          <Route path='/reservation' element={<ReservationPage />}></Route>
          <Route path='/myreservations' element={<MyReservations />} />
          <Route
            path='/reservationSuccess'
            element={<ReservationSuccessPage />}
          />
        </Route>
        {/* 그 밖의 요청시 404 페이지로 보내주기 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
