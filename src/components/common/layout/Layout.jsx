import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';

function Layout() {
  return (
    <div className={styles.wrap}>
      <div className={styles.layoutCon}>
        <Header />
        <section className={styles.contents}>
          <Outlet />
        </section>
        <Nav />
      </div>
    </div>
  );
}

export default Layout;
