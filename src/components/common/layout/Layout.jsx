import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';

function Layout() {
  return (
    <div className={styles.wrap}>
      <section className={styles.contents}>
        <Header></Header>
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
