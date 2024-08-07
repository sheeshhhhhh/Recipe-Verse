
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import AvatarProfile from "../AvatarProfile"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { useAuthContext } from "@/context/authContext"
import FollowUser from "../FollowUser"

type Author = {
    id: string,
    name: string,
    username: string,
    profile: string,
    userInfo: {
        bio: string,
        email: string,
    },
    postCount: number,
    followerCount: number,
    followingCount: number,
    createAt: string
}

type AuthorProfileType = {
    author: Author
}

const AuthorProfile = ({
    author
} : AuthorProfileType) => {

    const { user } = useAuthContext()
    const isOwner = user.id === author.id

    return (
        <aside className="w-[375px] flex flex-col gap-4">
            
            <Card className="w-[375px] h-auto border-t-[35px] border-t-[#000000] relative">
                <CardHeader className="pt-0 flex flex-col gap-4 relative top-[-20px]">

                    <div>

                        <Link to={`/profile/${author.id}`} className="flex w-full">
                            <AvatarProfile 
                            authorProfile={author.profile} 
                            authorName={author.name} 
                            className="h-12 w-12 mr-2"
                            />
                            <CardTitle className="text-xl font-semibold mt-4">{author.name}</CardTitle>
                        </Link>

                        <div className="flex justify-center items-center gap-4 mx-4 mt-1">
                            <CardDescription>Posts {author.postCount}</CardDescription>
                            <CardDescription>Followers {author.followerCount}</CardDescription>
                            <CardDescription>Following {author.followingCount}</CardDescription>
                        </div>

                    </div>

                    <div className="flex justify-center">
                        
                        {
                            isOwner ? 
                            <Button className="w-[350px] rounded-lg">Edit Profile</Button> : 
                            <FollowUser authorId={author.id} />
                        }

                    </div>

                    {
                        author.userInfo.bio  && 
                        <div className="max-w-[325px]">
                            <p>{author.userInfo.bio}</p>
                        </div>
                    }

                    <div>
                        <h3 className="font-bold uppercase text-sm">Joined</h3>
                        <span className="text-sm">{format(new Date(author.createAt), 'MMM dd, yyyy')}</span>
                    </div>

                </CardHeader>
            </Card>

        </aside>
    )
}

export default AuthorProfile