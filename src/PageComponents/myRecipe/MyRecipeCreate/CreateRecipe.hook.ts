import { Recipe } from '@/Pages/Explore/Explore'
import { useState } from 'react'

const useCreateRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const create = async (recipeData: Recipe) => {
    setLoading(true)
    try {
      //make form Data for photo handling
      const formData = new FormData()

      const res: Response = await fetch('http://localhost:3000/api/recipe/create', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error) throw new Error(data.error)

      // handle Data here or redirect
    } catch (error: any) {
      console.log('Error in createfunction in the useCreateRecipe hook' + 'Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  } 

  return { loading, create } 
}

export default useCreateRecipe