import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from '../components/MealCard';

function IngredientMeals() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state

  useEffect(() => {
    const fetchMealsByIngredient = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/filter.php?i=${name}`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Error fetching meals by ingredient:', error);
        setErrorMessage('Failed to fetch meals. Please try again later.'); // Set error message
      }
    };
    fetchMealsByIngredient();
  }, [name]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Meals with {name}</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default IngredientMeals;
