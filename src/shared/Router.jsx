import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "pages/main/MainPage";
import "styles/scss/reset.scss";
import AccountPage from "pages/account/AccountPage";
import Login from "components/Login";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/account" element={<AccountPage />}>
					<Route path="/account/login" element={<Login />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
