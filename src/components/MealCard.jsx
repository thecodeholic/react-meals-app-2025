function MealCard({ meal }) {
  return (
    <div key={meal.idMeal} className="bg-gray-800 p-4 rounded text-left">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover rounded" />
      <h2 className="mt-2 text-xl font-bold">{meal.strMeal}</h2>
      <p className="mt-1">{meal.strInstructions?.substring(0, 100)}...</p>
      <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block p-2 rounded bg-blue-600 hover:bg-blue-700">
        YouTube
      </a>
    </div>
  );
}

export default MealCard;
