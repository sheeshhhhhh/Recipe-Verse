
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthContext } from '@/context/authContext'
import AvatarProfile from '@/PageComponents/AvatarProfile'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import Follow from './Follow'

type ProfileInfoProps = {
    userInfo: any,
    postCount: number
}

const ProfileInfo = ({
    userInfo,
    postCount
} : ProfileInfoProps) => {
    const { user } = useAuthContext() // the current user that is viewing
    const { id } = useParams()// the profile being viewed
    
    const isOwner = user.id === id

    return (
        <aside className="w-[375px] flex flex-col gap-4">
    
            <Card className="w-[375px] h-auto border-t-[35px] border-t-[#000000] relative">
                <CardHeader className="pt-0 flex flex-col gap-4 relative top-[-20px]">
                    <div>
                        <div className="flex w-full">
                            <AvatarProfile 
                            authorProfile={userInfo.profile} 
                            authorName={userInfo.name} 
                            className="h-12 w-12 mr-2"
                            />
                            <CardTitle className="text-xl font-semibold mt-4">{userInfo.name}</CardTitle>
                        </div>
                        <div>
                            <CardDescription className='text-sm ml-14'>{userInfo.username}</CardDescription>
                        </div>
                        <div className="flex justify-center items-center gap-4 mx-4 mt-1">
                            <CardDescription>Posts {postCount}</CardDescription>
                            <CardDescription>Followers {userInfo.followerCount}</CardDescription>
                            <CardDescription>Following {userInfo.followingCount}</CardDescription>
                        </div>
                    </div>
                    {user && <div className="flex justify-center">
                        
                        {
                            isOwner ? 
                            <Button 
                            onClick={() => window.location.assign('http://localhost:3000/settings')}
                            className="w-[350px] rounded-lg">
                                Edit Profile
                            </Button> : 
                            <Follow userId={userInfo.id} />
                            
                        }
                    </div>}
                    {
                        userInfo.userInfo.bio  && 
                        <div className="max-w-[325px]">
                            <p>{userInfo.userInfo.bio}</p>
                        </div>
                    }
                    <div>
                        <h3 className="font-bold uppercase text-sm">Joined</h3>
                        <span className="text-sm">{format(new Date(userInfo.createAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <div>
                        <h3 className='font-bold uppercase text-sm'>Social Media</h3>
                    </div>
                </CardHeader>
            </Card>

        </aside>
    )
}

export default ProfileInfo