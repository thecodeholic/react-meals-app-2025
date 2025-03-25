import MealCard from '../components/MealCard'
import MainLayout from '../layouts/MainLayout'
import SearchForm from '../components/SearchForm'
import LoadingIndicator from '../components/LoadingIndicator'
import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Home() {
  const [search, setSearch] = useState('')
  const [meals, setMeals] = useState([])
  const [error, setError] = useState('')
  const [heading, setHeading] = useState('Random Meals')
  const [loading, setLoading] = useState(false)

  const handleSearch = (query) => {
    console.log('Search query:', query)

    if (!query) {
      setHeading('Random Meals')
      fetchRandomMeals()
      return
    }

    setError('')
    setMeals([])
    setLoading(true)

    try {
      // Fetch data from API
      const url = `${API_BASE_URL}/search.php?s=${query}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setHeading(`Search results for "${query}"`)
          setMeals(data.meals || [])
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          setError('Error fetching data')
          setLoading(false)
        })
    } catch (error) {
      console.error('Error fetching meals:', error)
      setError('Error fetching meals')
      setLoading(false)
    }
  }

  const fetchRandomMeals = async () => {
    setError('')
    setLoading(true)
    try {
      const url = `${API_BASE_URL}/random.php`
      const promises = Array.from({ length: 6 }, () => fetch(url).then(response => response.json()))
      const results = await Promise.all(promises)
      const randomMeals = results.map(result => result.meals[0])
      setMeals(randomMeals)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching random meals:', error)
      setError('Error fetching random meals')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomMeals()
  }, [])


  return (
    <MainLayout>
      <div className='p-4'>
        <div className="flex justify-center my-4">
          <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
        </div>

        <h2 className='text-2xl font-bold mb-4'>{heading}</h2>
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
