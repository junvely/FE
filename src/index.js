import ReactDOM from 'react-dom/client';
import App from 'App';
import 'index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <App />
    <ReactQueryDevtools />
    {/* </React.StrictMode> */}
  </QueryClientProvider>,
);
