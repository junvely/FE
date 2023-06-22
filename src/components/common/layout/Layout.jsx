import { Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';

function Layout() {
  const location = useLocation();
  return (
    <div className={styles.wrap}>
      <div className={styles.backgroundWrap}>
        <div className={styles.layoutCon}>
          <Header />
          <section className={styles.contents}>
            <Outlet />
          </section>
          {location.pathname.startsWith('/chatting/room') ? null : <Nav />}
        </div>
      </div>
    </div>
  );
}

export default Layout;
