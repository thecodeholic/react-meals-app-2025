import { useState, useEffect } from 'react';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 p-4 bg-gray-800 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl">Meal Search</Link>
          <nav>
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/ingredients" className="mr-4">Ingredients</Link>
          </nav>
        </div>
      </header>
      <main className="pt-20 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/ingredient/:name" element={<IngredientMeals />} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('12 Random Meals');

  const fetchRandomMeals = async () => {
    setLoading(true);
    const promises = Array.from({ length: 12 }, () => fetch('https://www.themealdb.com/api/json/v1/1/random.php'));
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(response => response.json()));
    const allMeals = data.flatMap(item => item.meals);
    setMeals(allMeals);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  useEffect(() => {
    if (search === '') {
      fetchRandomMeals();
    }
  }, [search]);

  const fetchMeals = async (query) => {
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    setMeals(data.meals || []);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      fetchRandomMeals();
      setDisplayTitle('12 Random Meals');
    } else {
      fetchMeals(search);
      setDisplayTitle(`Meals for "${search}"`);
    }
    document.title = search ? `Meals for "${search}"` : 'Meal Search';
  };

  const fetchMealsByLetter = async (letter) => {
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    setMeals(data.meals || []);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Search for a meal..."
        />
        <button type="submit" className="ml-2 p-2 rounded bg-blue-600 hover:bg-blue-700">
          Search
        </button>
      </form>
      <div className="mt-4">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => fetchMealsByLetter(letter)}
            className="mr-2 p-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            {letter}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-center col-span-full py-8 text-gray-400">Loading...</p>
      ) : (
        <div>
          <h2 className="text-3xl text-left my-4">
            {displayTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <div key={meal.idMeal} className="bg-gray-800 p-4 rounded text-left">
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded" />
                  <h2 className="mt-2 text-xl font-bold">{meal.strMeal}</h2>
                  <p className="mt-1">{meal.strInstructions.substring(0, 100)}...</p>
                  <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block p-2 rounded bg-blue-600 hover:bg-blue-700">
                    YouTube
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full py-8 text-gray-400">No meals found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredients(data.meals || []);
    };
    fetchIngredients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Ingredients</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => (
          <Link key={ingredient.idIngredient} to={`/ingredient/${ingredient.strIngredient}`} className="bg-gray-800 p-4 rounded">
            {ingredient.strIngredient}
          </Link>
        ))}
      </div>
    </div>
  );
}

function IngredientMeals() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMealsByIngredient = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
      const data = await response.json();
      setMeals(data.meals || []);
    };
    fetchMealsByIngredient();
  }, [name]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Meals with {name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="bg-gray-800 p-4 rounded">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-xl font-bold">{meal.strMeal}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
