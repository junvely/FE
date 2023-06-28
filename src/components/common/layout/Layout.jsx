import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';
import useAuth from '../../../hooks/useAuth';

function Layout() {
  const location = useLocation();
  const { reloadTokenRefresh } = useAuth();

  useEffect(() => {
    reloadTokenRefresh();
  }, []);

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
