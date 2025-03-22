import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner'; // Import Spinner

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/list.php?i=list`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        const data = await response.json();
        setIngredients(data.meals || []);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setErrorMessage('Failed to fetch ingredients. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchIngredients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center mb-4">Ingredients</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
      {loading ? (
        <Spinner /> // Use Spinner component
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {ingredients.map((ingredient) => (
            <Link key={ingredient.idIngredient} to={`/ingredient/${ingredient.strIngredient}`} className="bg-gray-800 p-4 rounded">
              {ingredient.strIngredient}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ingredients;
