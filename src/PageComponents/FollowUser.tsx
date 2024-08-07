import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

type FollowUserProps = {
    postId: string,
    authorId: string,
    className?: string
}

const FollowUser = ({
    authorId,
    className,
    postId
} : FollowUserProps) => {
    const queryClient = useQueryClient();

    const { data: isFollowing, isLoading } = useQuery({
        queryKey: ['following', authorId],
        queryFn: async () => {
            const res: Response = await fetch(`http://localhost:4000/api/user/isFollowing/${authorId}`, {
                credentials: 'include'
            })
            const data = await res.json()

            if(data.error) throw new Error(data.error)
            
            return data.message === 'following' ? true : false
        }
    })

    // optimistic update follow
    const { mutate: followMutate, isPending: followisPending } = useMutation({
        mutationKey: ['followUser', authorId],
        mutationFn: async () => {
            const res = await fetch(`http://localhost:4000/api/user/followUser/${authorId}`, {
                method: 'POST',
                credentials: 'include'
            })  
            const data = await res.json()
            if(data.error) throw new Error(data.error) 
            return data
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['following', authorId] })

            const previousState = queryClient.getQueryData<boolean>(['following', authorId])

            queryClient.setQueryData(['following', authorId], (!previousState))

            return { previousState }
        },
        onError(error, variables, context) {
            queryClient.setQueryData(['following', authorId], () => context?.previousState)
            toast.error('failed to follow')
        },
        onSuccess: (data, variable, context) => {

            queryClient.setQueryData(['Viewrecipe', postId], (oldData: any) => {
                if(!oldData) return
                return  {
                    ...oldData,
                    author: {
                        ...oldData.author,
                        followerCount: (oldData.author.followerCount || 0) + 1
                    }
                }
            })

        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['following', authorId] })
        }
    })
    // optimistic update unfollow
    const { mutate: unfollowMutate, isPending: unfollowisPending } = useMutation({
        mutationKey: ['unfollowUser', authorId],
        mutationFn: async () => {
            const res = await fetch(`http://localhost:4000/api/user/unfollowUser/${authorId}`, {
                method: 'POST', 
                credentials: 'include' 
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['following', authorId]})

            const previousState = queryClient.getQueryData<boolean>(['following', authorId])

            queryClient.setQueryData(['following', authorId], (!previousState))

            return { previousState }
        },
        onError(error, variables, context) {
            queryClient.setQueryData(['following', authorId], () => context?.previousState)
            toast.error('failed to unfollow')
        },
        onSuccess: (data, variable, context) => {

            queryClient.setQueryData(['Viewrecipe', postId], (oldData: any) => {
                if(!oldData) return
                return {
                    ...oldData,
                    author: {
                        ...oldData.author,
                        followerCount: (oldData.author.followerCount || 0) - 1
                    }
                }
            })

        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['following', authorId] })
        }
    })

    return (
        <div className={cn('w-full flex items-center justify-center', className)}>
            {   

                isLoading ?
                
                    <LoadingSpinner />

                :

                isFollowing ? 
                
                    <Button
                    disabled={unfollowisPending}
                    onClick={() => unfollowMutate()}
                    className="w-full rounded-lg"
                    >
                        following
                    </Button>
                    
                :

                    <Button 
                    disabled={followisPending}
                    onClick={() => followMutate()} 
                    className="w-full rounded-lg">
                        follow
                    </Button>

            }
        </div>
    )
}

export default FollowUser