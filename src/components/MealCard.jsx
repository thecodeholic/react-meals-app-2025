import { Link } from 'react-router-dom';

function MealCard({ meal }) {
  return (
    <div className="bg-gray-800 p-4 rounded text-left">
      <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded" />
        <h2 className="mt-2 text-xl font-bold">{meal.strMeal}</h2>
        <p className="mt-1">{meal.strInstructions?.substring(0, 100)}...</p>
      </Link>
      <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block p-2 rounded bg-indigo-600 hover:bg-indigo-700">
        YouTube
      </a>
    </div>
  );
}

export default MealCard;
