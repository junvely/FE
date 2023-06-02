import { Outlet } from 'react-router-dom';
import { useMemo, useState } from 'react';
import styles from './layout.module.scss';
import Header from '../header/Header';
import Nav from '../nav/Nav';
import SearchPostsContext from '../../../contexts/PostsContext';

function Layout() {
  const [searchPayload, setSearchPayload] = useState({
    page: '',
    size: '',
    keyword: '',
    sorting: '인기순',
    district: '',
  });

  const updateSearchPayload = newPayload => {
    setSearchPayload(newPayload);
  };

  const searchPayloadMemoizedValue = useMemo(
    () => ({
      searchPayload,
      updateSearchPayload,
    }),
    [searchPayload, updateSearchPayload],
  );

  return (
    <SearchPostsContext.Provider value={searchPayloadMemoizedValue}>
      <div className={styles.wrap}>
        <div className={styles.layoutCon}>
          <Header />
          <section className={styles.contents}>
            <Outlet />
          </section>
          <Nav />
        </div>
      </div>
    </SearchPostsContext.Provider>
  );
}

export default Layout;
