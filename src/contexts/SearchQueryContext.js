import { createContext, useMemo, useState } from 'react';

const SearchQueryContext = createContext();

function SearchQueryProvider({ children }) {
  const initialQuery = {
    page: '',
    size: '',
    keyword: '',
    sorting: '인기순',
    district: '',
  };

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const updateSearchQuery = newPayload => {
    setSearchQuery(newPayload);
  };

  const resetSearchQuery = () => {
    setSearchQuery(initialQuery);
  };

  const searchQueryValue = useMemo(
    () => ({
      searchQuery,
      updateSearchQuery,
      resetSearchQuery,
    }),
    [searchQuery, updateSearchQuery, resetSearchQuery],
  );

  return (
    <SearchQueryContext.Provider value={searchQueryValue}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export { SearchQueryContext, SearchQueryProvider };
