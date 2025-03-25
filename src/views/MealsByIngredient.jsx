import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import MealCard from '../components/MealCard'
import LoadingIndicator from '../components/LoadingIndicator'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function MealsByIngredient() {
  const { ingredient } = useParams()
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  
  const fetchMeals = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`)
      const data = await response.json()
      setMeals(data.meals || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching meals:', error)
      setError('Error fetching meals')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [ingredient])

  return (
    <MainLayout>
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>Meals with {ingredient}</h2>
        {error && <p className="text-center py-8 text-red-500">{error}</p>}
        {loading && <LoadingIndicator />}
        {!loading && meals.length === 0 && !error && <p className="text-center py-8 text-gray-400">No meals found</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
