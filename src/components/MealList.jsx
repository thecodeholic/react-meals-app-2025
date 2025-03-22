function MealList({ meals, displayTitle }) {
  return (
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
  );
}

export default MealList;
