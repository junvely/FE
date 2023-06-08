import { createContext, useMemo, useState } from 'react';

const searchToggleContext = createContext();

function SearchToggleProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchToggleSwitch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const searchToggleValue = useMemo(
    () => ({
      isSearchOpen,
      searchToggleSwitch,
    }),
    [isSearchOpen, searchToggleSwitch],
  );

  return (
    <searchToggleContext.Provider value={searchToggleValue}>
      {children}
    </searchToggleContext.Provider>
  );
}

export { searchToggleContext, SearchToggleProvider };
