import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import MealCard from '../components/MealCard';
import Spinner from '../components/Spinner'; // Import Spinner

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RANDOM_MEALS = 6;

function Home() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(`${RANDOM_MEALS} Random Meals`);
  const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state

  const fetchRandomMeals = async () => {
    setLoading(true);
    try {
      const promises = Array.from({ length: RANDOM_MEALS }, () => fetch(`${API_BASE_URL}/random.php`));
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        return response.json();
      }));
      const allMeals = data.flatMap(item => item.meals);
      setMeals(allMeals);
    } catch (error) {
      console.error('Error fetching random meals:', error);
      setErrorMessage('Failed to fetch meals. Please try again later.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search === '') {
      fetchRandomMeals();
    }
  }, [search]);

  const fetchMeals = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response was not ok: ${text}`);
      }
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setErrorMessage('Failed to fetch meals. Please try again later.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      fetchRandomMeals();
      setDisplayTitle(`${RANDOM_MEALS} Random Meals`);
    } else {
      fetchMeals(search);
      setDisplayTitle(`Meals for "${search}"`);
    }
  };

  return (
    <div>
      <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2 className="text-3xl text-left my-4">{displayTitle}</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            {meals.length > 0 ? (
              meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
            ) : (
              <p className="text-center col-span-full py-8 text-gray-400">No meals found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
