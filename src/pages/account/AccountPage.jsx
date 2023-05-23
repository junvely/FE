import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./accountPage.module.scss";

function AccountPage() {
	return (
		<div className={styles.wrap}>
			AccountPage
			<Outlet />
		</div>
	);
}

export default AccountPage;
