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
  const [isSearched, setIsSearched] = useState(false);

  const updateSearchQuery = newPayload => {
    setSearchQuery(newPayload);
    setIsSearched(true);
  };

  const resetSearchQuery = () => {
    setSearchQuery(initialQuery);
    setIsSearched(false);
  };

  const searchQueryValue = useMemo(
    () => ({
      searchQuery,
      isSearched,
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
