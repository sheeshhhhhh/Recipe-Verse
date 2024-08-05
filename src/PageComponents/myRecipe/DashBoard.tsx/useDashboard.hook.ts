import { useEffect, useState } from "react"
import { PostDataType } from "./Dashboard"


const useDashboard = () => {
    const [post, setPost] = useState<PostDataType []>([])
    
    const getpostDashboard = async () => {
        try {
            // apply pagination later
            const res: Response = await fetch('http://localhost:4000/api/dashboard/getPostDashboard', {
                method: 'POST',
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            setPost(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getpostDashboard()
    }, [])

    return { post, getpostDashboard }
}

export default useDashboard