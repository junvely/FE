import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';

function Layout() {
  return (
    <div className={styles.wrap}>
      <div className={styles.layoutCon}>
        <Header></Header>
        <Outlet />
        <Nav />
      </section>
    </div>
  );
}

export default Layout;
