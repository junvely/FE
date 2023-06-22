import { useRecoilState, useResetRecoilState } from 'recoil';
import { isSearchedState, searchQueryState } from '../atoms/searchQueryAtom';

const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [isSearched, setIsSearched] = useRecoilState(isSearchedState);
  const resetQuery = useResetRecoilState(searchQueryState);

  const updateSearchQuery = newPayload => {
    setSearchQuery(newPayload);
    if (newPayload.keyword || newPayload.district) {
      setIsSearched(true);
    }
  };

  const resetSearchQuery = () => {
    resetQuery();
    setIsSearched(false);
  };

  return { searchQuery, isSearched, updateSearchQuery, resetSearchQuery };
};

export default useSearchQuery;
