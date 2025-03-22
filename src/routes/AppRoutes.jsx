import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Ingredients from '../views/Ingredients';
import IngredientMeals from '../views/IngredientMeals';
import MealDetails from '../views/MealDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/ingredient/:name" element={<IngredientMeals />} />
      <Route path="/meal/:id" element={<MealDetails />} />
    </Routes>
  );
}

export default AppRoutes;
