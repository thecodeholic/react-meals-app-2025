import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoadingIndicator from '../components/LoadingIndicator'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function MealDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMealDetails = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`)
        const data = await response.json()
        setMeal(data.meals[0])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching meal details:', error)
        setError('Error fetching meal details')
        setLoading(false)
      }
    }

    fetchMealDetails()
  }, [id])

  return (
    <MainLayout>
      <div className='max-w-2xl mx-auto'>
        {loading && <LoadingIndicator />}
        {error && <p className="text-center py-8 text-red-500">{error}</p>}
        {!loading && !error && meal && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full mb-4" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">
                <span className='font-bold'>Category</span>: {meal.strCategory}
              </h3>
              <h3 className="text-xl">
                <span className='font-bold'>Area</span>: {meal.strArea}
              </h3>
              <h3 className="text-xl">
                <span className='font-bold'>Tags</span>: {meal.strTags}
              </h3>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Instructions:</h3>
              <p>{meal.strInstructions}</p>
            </div>
            <div className="flex justify-between gap-8">

              <div className="mb-4">
                <h3 className="text-xl font-bold">Ingredients:</h3>
                <ul>
                  {Object.keys(meal)
                    .filter(key => key.startsWith('strIngredient') && meal[key])
                    .map(key => (
                      <li key={key}>{meal[key]}</li>
                    ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Measures:</h3>
                <ul>
                  {Object.keys(meal)
                    .filter(key => key.startsWith('strMeasure') && meal[key])
                    .map(key => (
                      <li key={key}>{meal[key]}</li>
                    ))}
                </ul>
              </div>
            </div>
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded mr-4">Watch on YouTube</button>
            </a>
            <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="text-indigo-600">View Original Source</a>
            
          </div>
        )}
      </div>
    </MainLayout>
  )
}
