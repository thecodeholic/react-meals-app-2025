import { NavLink, Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 p-4 bg-gray-800 z-10">
        <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
          <NavLink to="/" className="text-3xl">Meal Search</NavLink>
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) => `mr-4 ${isActive ? 'text-indigo-500' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/ingredients"
              className={({ isActive }) => `mr-4 ${isActive ? 'text-indigo-500' : ''}`}
            >
              Ingredients
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container max-w-6xl mx-auto pt-20 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
