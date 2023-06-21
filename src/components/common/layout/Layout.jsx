import { Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';
import { SearchQueryProvider } from '../../../contexts/SearchQueryContext';
import { SearchToggleProvider } from '../../../contexts/SearchToggleContext';

function Layout() {
  const location = useLocation();
  console.log(location);
  return (
    <SearchToggleProvider>
      <SearchQueryProvider>
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
      </SearchQueryProvider>
    </SearchToggleProvider>
  );
}

export default Layout;
