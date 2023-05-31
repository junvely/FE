import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';

function Layout() {
  return (
    <div className={styles.wrap}>
      <section className={styles.contents}>
        <Header></Header>
        <Outlet />
        <Nav />
      </section>
    </div>
  );
}

export default Layout;
