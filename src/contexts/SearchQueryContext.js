import { createContext, useMemo, useState } from 'react';

const SearchQueryContext = createContext();

function SearchQueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState({
    page: '',
    size: '',
    keyword: '',
    sorting: '인기순',
    district: '',
  });

  const updateSearchQuery = newPayload => {
    setSearchQuery(newPayload);
  };

  const searchQueryValue = useMemo(
    () => ({
      searchQuery,
      updateSearchQuery,
    }),
    [searchQuery, updateSearchQuery],
  );

  return (
    <SearchQueryContext.Provider value={searchQueryValue}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export { SearchQueryContext, SearchQueryProvider };
