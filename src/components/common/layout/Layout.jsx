import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import Header from '../header/Header';

function Layout() {
  return (
    <div className={styles.wrap}>
      <div className={styles.layoutCon}>
        <Header></Header>
        <section className={styles.contents}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default Layout;
