import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserContextProvider } from './context/UserContext';
import AppRoutes from './routes/Index';


function App() {
  return (
    <UserContextProvider>
      <AppRoutes/>
    </UserContextProvider>

  );
}

export default App;