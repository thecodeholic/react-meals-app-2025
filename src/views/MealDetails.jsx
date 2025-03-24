import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lookup.php?i=${id}`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setErrorMessage('Failed to fetch meal details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="container max-w-3xl text-left mx-auto p-4">
      {meal && (
        <div>
          <h2 className="text-3xl mb-4 font-bold">{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full object-cover rounded mb-4" />
          <div className="mb-4 flex justify-between space-x-4">
            <div>
              <strong>Category:</strong> {meal.strCategory}
            </div>
            <div>
              <strong>Area:</strong> {meal.strArea}
            </div>
            <div>
              <strong>Tags:</strong> {meal.strTags}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Instructions:</h3>
            <p>{meal.strInstructions}</p>
          </div>
          <div className="mb-4 flex">
            <div className="w-1/2">
              <h3 className="text-2xl font-semibold">Ingredients</h3>
              <ul>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                  const ingredient = meal[`strIngredient${i}`];
                  return ingredient ? (
                    <li key={i}>
                      {ingredient}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
            <div className="w-1/2">
              <h3 className="text-2xl font-semibold">Measures</h3>
              <ul>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                  const measure = meal[`strMeasure${i}`];
                  return measure ? (
                    <li key={i}>
                      {measure}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block p-2 rounded bg-indigo-600 hover:bg-indigo-700">
            YouTube
          </a>
          <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block p-2 rounded bg-gray-600 hover:bg-gray-700 ml-2">
            View Original Source
          </a>
        </div>
      )}
    </div>
  );
}

export default MealDetails;
