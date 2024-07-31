import React, { useState } from 'react'
import { recipeInfoType } from '../MyRecipeForm/MyRecipeCreate'

const EditRecipe = () => {
    const [loading, setLoading] = useState<boolean>(false) 
    const [dataLoading, setDataLoading] = useState<boolean>(false)

    const getData = async (recipeId: string): Promise<recipeInfoType | { error: string }> => {
        setDataLoading(true)
        try {
            const res:Response = await fetch(`http://localhost:3000/api/recipe/get/${recipeId}`, {
                method: 'GET',
                credentials: 'include'
            }) 

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            return data
        } catch (error: any) {
            console.log('getData function in editRecipe hooks Error: ' + error.message)
            return { error: error.message }
        } finally {
            setDataLoading(false)
        }
    }

    const SaveEdit = async (recipeId: string, recipeData: recipeInfoType): Promise<recipeInfoType | { error: string}> => {
        setLoading(true)
        try {
            const formData = new FormData()
            // data the recipedata to the form later

            const res: Response = await fetch(`http://localhost:3000/api/recipe/edit/${recipeId}`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            return data
        } catch (error: any) {
            console.log('Error in the SaveEdit function in the EditRecipe hook', "Errod: " + error.message)
            return { error: error.message }
        } finally {
            setLoading(false)
        }
    } 

    const getDataValues = {
        loading: dataLoading,
        getData: getData
    }

    const SaveEditValues = {
        loading: loading,
        SaveEdit: SaveEdit
    }

    return { 
        saveEdit: SaveEditValues,
        getData: getDataValues 
    }
}

export default EditRecipe