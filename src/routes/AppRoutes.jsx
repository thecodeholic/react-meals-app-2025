import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Ingredients from '../views/Ingredients';
import IngredientMeals from '../views/IngredientMeals';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/ingredient/:name" element={<IngredientMeals />} />
    </Routes>
  );
}

export default AppRoutes;
