import { useRecoilState } from 'recoil';
import searchToggleState from '../atoms/searchToggleAtom';

const useSearchToggle = () => {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchToggleState);

  const searchToggleSwitch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return { isSearchOpen, searchToggleSwitch };
};

export default useSearchToggle;
