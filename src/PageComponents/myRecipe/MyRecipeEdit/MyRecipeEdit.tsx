import React, { FormEvent, useEffect } from 'react'
import MyRecipeForm, { recipeInfoType } from '../MyRecipeForm/MyRecipeCreate'
import EditRecipe from './EditRecipe.hook'
import LoadingSpinner from '@/PageComponents/LoadingSpinner'


const MyRecipeEdit = () => {
    // create a params for this so taht we can get the recipe Id
    const { saveEdit, getData } = EditRecipe()

    const callbackFunction = async (e: FormEvent<HTMLFormElement>, recipeData: recipeInfoType) => {
        e.preventDefault()
        //saveEdit.SaveEdit(recipeId, recipeData)
        console.log(recipeData)
    }

    useEffect(() => {
        getData.getData('1231231313131') // just an example supposed to get the recipe Id
    }, [])

    if(getData.loading) return (
        <div className='h-full'>
            <LoadingSpinner className='h-9 w-9 mt-32' />
        </div>
    )

    return (
        <MyRecipeForm loading={saveEdit.loading} callbackFunction={callbackFunction} />
    )
}

export default MyRecipeEdit