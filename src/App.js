import Router from 'shared/Router';
import { RecoilRoot } from 'recoil';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </RecoilRoot>
  );
}

export default App;
