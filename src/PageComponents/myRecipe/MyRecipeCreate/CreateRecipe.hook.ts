import { Recipe } from '@/Pages/Explore/Explore'
import { useState } from 'react'
import formData from './formData.utils'

const useCreateRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const create = async (recipeData: Recipe) => {
    setLoading(true)
    try {
      //make form Data for photo handling
      const formdata = formData(recipeData)

      const res: Response = await fetch('http://localhost:4000/api/recipe/create', {
        method: 'POST',
        body: formdata,
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

  const saveDraft = async (recipeData: Recipe) => {
    try {
      const formdata = formData(recipeData)

      const res: Response = await fetch('http://localhost:4000/api/dashboard/saveDraft', {
        method: 'POST',
        body: formdata,
        credentials: 'include'
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error)

      // handle later
    } catch (error: any) {
      console.log('Error in createfunction in the useCreateRecipe hook Error: ' + error.message)
    }
  }

  return { loading, create, saveDraft } 
}

export default useCreateRecipe