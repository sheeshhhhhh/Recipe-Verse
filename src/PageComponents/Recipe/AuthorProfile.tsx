
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import AvatarProfile from "../AvatarProfile"
import { Button } from "@/components/ui/button"

type Author = {
    id: string,
    name: string,
    username: string,
    profile: string,
    userInfo: {
        bio: string,
        email: string,
        following: number,
        followers: number
    },
    postCount: number,
    createAt: string
}

type AuthorProfileType = {
    author: Author
}

const AuthorProfile = ({
    author
} : AuthorProfileType) => {
  return (
    <aside className="w-[375px] flex flex-col gap-4">
        
        <Card className=" w-[375px] h-auto">
            <CardHeader>
                <div>
                    <Link to={`/profile/${author.id}`} className="flex w-full">
                        <AvatarProfile 
                        authorProfile={author.profile} 
                        authorName={author.name} 
                        className="h-12 w-12 mr-2"
                        />
                        <CardTitle className="text-xl font-semibold mt-4">{author.name}</CardTitle>
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-4 mx-4">
                    <CardDescription>Posts {author.postCount}</CardDescription>
                    <CardDescription>Followers {author.userInfo.followers}</CardDescription>
                    <CardDescription>Following {author.userInfo.followers}</CardDescription>
                </div>
                <div className="flex justify-center">
                    <Button className="w-[350px]">Follow</Button>
                </div>
            </CardHeader>
        </Card>

    </aside>
  )
}

export default AuthorProfile