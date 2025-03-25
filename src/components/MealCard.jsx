import { Link } from 'react-router-dom'

export default function MealCard({ meal }) {
    return (
        <div className="bg-gray-800 text-white max-w-sm rounded overflow-hidden shadow-lg">
            <Link to={`/meal/${meal.idMeal}`}>
                <img className="w-full" src={meal.strMealThumb} alt="Meal" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl">{meal.strMeal}</div>
                </div>
            </Link>
            {(meal.strInstructions || meal.strYoutube) && <div className="px-6 py-4">
                {meal.strInstructions && <p className="text-gray-300 text-base">
                    {meal.strInstructions.slice(0, 100)}...
                </p>}
                {meal.strYoutube && (
                    <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded mt-2 block">Watch on YouTube</button>
                    </a>
                )}
            </div>}
        </div>
    )
}