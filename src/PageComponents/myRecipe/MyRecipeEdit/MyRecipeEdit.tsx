import { FormEvent, useEffect, useState } from 'react'
import MyRecipeForm, { recipeInfoType } from '../MyRecipeForm/MyRecipeCreate'
import EditRecipe from './EditRecipe.hook'
import LoadingSpinner from '@/PageComponents/LoadingSpinner'
import {  useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '@/context/authContext'


const MyRecipeEdit = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const [recipeData, setRecipeData] = useState<recipeInfoType>()

    if(!postId) return navigate('/error')

    const { saveEdit, getData } = EditRecipe()
    const { user } = useAuthContext()

    const callbackFunction = async (e: FormEvent<HTMLFormElement>, recipeData: recipeInfoType) => {
        e.preventDefault()
        await saveEdit.SaveEdit(postId, recipeData)
    }

    useEffect(() => {    
        const fetchData = async () => {
        
            const data = await getData.getData(postId) 
            
            if(data.author.id !== user.id) return console.log('not the owner of this recipe')

            setRecipeData(data.recipe)
        }
        fetchData()
    }, [])

    if(getData.loading) return (
        <div className='h-full'>
            <LoadingSpinner className='h-9 w-9 mt-32' />
        </div>
    )

    return (
        <MyRecipeForm 
        recipeData={recipeData} 
        loading={saveEdit.loading} 
        callbackFunction={callbackFunction} />
    )
}

export default MyRecipeEdit