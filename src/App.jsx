import { useLocation } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
