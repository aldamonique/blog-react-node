import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserContextProvider } from './context/UserContext';
import AppRoutes from './routes/Index';
import { SearchProvider } from './context/SearchContext';
function App() {
  return (
    <SearchProvider>

    <UserContextProvider>
      <AppRoutes/>
    </UserContextProvider>
</SearchProvider>
  );
}

export default App;