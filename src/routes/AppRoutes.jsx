import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Ingredients from '../views/Ingredients';
import IngredientMeals from '../views/IngredientMeals';
import MealDetails from '../views/MealDetails';
import MainLayout from '../layouts/MainLayout'; // Import MainLayout

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="ingredients" element={<Ingredients />} />
        <Route path="ingredient/:name" element={<IngredientMeals />} />
        <Route path="meal/:id" element={<MealDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
