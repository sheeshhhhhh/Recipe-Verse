import { useEffect, useState } from 'react'
import { DraftDataType } from './MyRecipeDraft'

const useDraft = () => {
    const [draftData, setDraftData] = useState<DraftDataType[] >([])

    const deleteDraft = async (postId: string) => {
        try {
            const res: Response = await fetch('http://localhost:4000/api/dashboard/delete', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ postId: postId}),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            
            const filterData = draftData.filter((recipe) => recipe.id !== postId)
            setDraftData(filterData)
        } catch (error: any) {
            console.log('error in the deleteDraft function in the useDraft hook Error: ' + error.message)
            return { error: error.message }
        }
    }

    const uploadDraft = async (postId: string) => {
        try {
            const res: Response = await fetch('http://localhost:4000/api/dashboard/upload', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({postId: postId}),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            const filterData = draftData.filter((recipe) => recipe.id !== postId)
            setDraftData(filterData)
        } catch (error: any) {
            console.log('error in the deleteDraft function in the useDraft hook Error: ' + error.message)
            return { error: error.message }
        }
    }

    const handleSearch = async (search: string) => {
        try {
            const res: Response = await fetch('http://localhost:4000/api/dashboard/search', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
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
            try {
                const res: Response = await fetch('http://localhost:4000/api/dashboard/getDraft', {
                    method: "GET",
                    credentials: 'include'
                })

                const data = await res.json()

                if(data.error) throw new Error(data.error)

                setDraftData(data)
            } catch (error: any) {
                console.log('error in the getDraftData useEffect in the useDraft Error:' + error.message)
                return { error : error.message}
            }
        }
        //getDraftData()
        getDraftData()
    }, [])

    return { draftData, deleteDraft, uploadDraft, handleSearch } 
}

export default useDraft