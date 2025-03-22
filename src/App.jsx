import { NavLink, useLocation } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 p-4 bg-gray-800 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-3xl">Meal Search</NavLink>
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) => `mr-4 ${isActive ? 'text-blue-500' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/ingredients"
              className={({ isActive }) => `mr-4 ${isActive ? 'text-blue-500' : ''}`}
            >
              Ingredients
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="pt-20 p-4">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
