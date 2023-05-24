import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';

function Layout() {
  return (
    <div className={styles.wrap}>
      <section className={styles.contents}>
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
