import React from "react";
import styles from "./main.module.scss";

function MainPage() {
	return (
		<input
			type="email"
			className={styles.wrap}
			// className="mt-1 px-4 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
			placeholder="yourmail@email.com"
		/>
	);
}

export default MainPage;
