import React, { useEffect, useState } from 'react'
import { DraftDataType } from './MyRecipeDraft'

const useDraft = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [draftData, setDraftData] = useState<DraftDataType[] >([])

    const deleteDraft = async (recipeId: string) => {
        try {
            const res: Response = await fetch('http://localhost:3000/api/recipe/delete', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ recipeId: recipeId}),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            // handle the data later
            // const filterData = draftData.filter((recipe) => recipe.id !== recipeId)
            // setDraftData(filterData)
        } catch (error: any) {
            console.log('error in the deleteDraft function in the useDraft hook Error: ' + error.message)
            return { error: error.message }
        }
    }

    const uploadDraft = async (recipeId: string) => {
        try {
            const res: Response = await fetch('http://localhost:3000/api/recipe/delete', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({recipeId: recipeId}),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            // const filterData = draftData.filter((recipe) => recipe.id !== recipeId)
            // setDraftData(filterData)
        } catch (error: any) {
            console.log('error in the deleteDraft function in the useDraft hook Error: ' + error.message)
            return { error: error.message }
        }
    }

    const handleSearch = async (search: string) => {
        try {
            const res: Response = await fetch('http://localhost:3000/api/recipe/search', {
                method: 'POST',
                headers: {
                    'Contect-Type' : 'application/json'
                },
                body: JSON.stringify({
                    search: search
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            setDraftData(data)
        } catch (error: any) {
            console.log('Error in the handleSearch function in the useDraft hook Error: ' + error.message)
            return { error : error.message }
        }
    }

    useEffect(() => {
        const getDraftData = async () => {
            setLoading(true)
            try {
                const res: Response = await fetch('http://localhost:3000/api/recipe/getDraft', {
                    method: "GET",
                    credentials: 'include'
                })

                const data = await res.json()

                if(data.error) throw new Error(data.error)

                setDraftData(data)
            } catch (error: any) {
                console.log('error in the getDraftData useEffect in the useDraft Error:' + error.message)
                return { error : error.message}
            } finally {
                setLoading(false)
            }
        }
        //getDraftData()
    }, [])

    return { loading, draftData, deleteDraft, uploadDraft, handleSearch } 
}

export default useDraft