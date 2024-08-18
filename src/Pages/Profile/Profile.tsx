import { useAuthContext } from "@/context/authContext"
import RecipeCollection from "@/PageComponents/explore/RecipeCollection"
import LoadingSpinner from "@/PageComponents/LoadingSpinner"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import ProfileInfo from "./ProfileInfo"


const Profile = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const { data: profileInfo, isLoading, error } = useQuery({
        queryKey: ['profileInfo'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/api/user/getProfile/${id}`)
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data
        }
    })
    const postCount = profileInfo.Posts.length || 0

    if(isLoading) return <LoadingSpinner />
    if(error) return <Navigate to={`/error?message=internal server Error(${error})`} />

    return (
        <div className="min-h-screen w-full">
            
            <div className="w-[1318px] gap-4 min-h-screen p-4 mx-auto flex">

                <div 
                className="w-[420px]"
                aria-label="profile-Info" >
                    <ProfileInfo 
                    postCount={postCount}
                    userInfo={profileInfo} 
                    />
                </div>

                <div 
                className="w-[850px]"
                aria-label="recipes" >
                    <RecipeCollection
                    className={'grid-cols-3 '}
                    recipeCollection={profileInfo.Posts}
                    loading={isLoading}
                    />
                </div>

            </div>

        </div>
    )
}

export default Profile