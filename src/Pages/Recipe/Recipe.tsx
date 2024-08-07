import AuthorProfile from "@/PageComponents/Recipe/AuthorProfile"
import RecipeBody from "@/PageComponents/Recipe/RecipeBody"
import SideBar from "@/PageComponents/Recipe/SideBar"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const Recipe = () => {
    const { id } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['Viewrecipe'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/api/post/getPost/${id}`, {
                credentials: 'include'
            })
            return res.json()
        }
    })

    if(isLoading) return

    if(data.error) window.location.assign('http://localhost:3000/explore')

    return (
        <div className="min-h-screen">
            <div className="mx-auto p-4 flex gap-4 w-[1348px]">
                
                <SideBar 
                postId={data.id}
                likesCount={data.likes}
                commentsCount={data.comments.length}
                favoritesCount={data.favorites}
                />

                <RecipeBody
                createdAt={data.createdAt}
                recipe={data.recipe}
                author={data.author}
                />

                <AuthorProfile 
                author={data.author}
                />

            </div>
        </div>
    )
}

export default Recipe