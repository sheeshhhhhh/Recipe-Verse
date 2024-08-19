import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/PageComponents/LoadingSpinner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

type FollowProps = {
    userId: string
}

const Follow = ({
    userId
} : FollowProps) => {

    const queryClient = useQueryClient()
    const { data: isFollowing, isLoading } = useQuery({
        queryKey: ['following'],
        queryFn: async () => {
            const res: Response = await fetch(`http://localhost:4000/api/user/isFollowing/${userId}`, {
                credentials: 'include'
            })
            const data = await res.json()

            if(data.error) throw new Error(data.error)
            
            return data.message === 'following' ? true : false
        }
    })

    // optimistic update follow
    const { mutate: followMutate, isPending: followisPending } = useMutation({
        mutationKey: ['followUser'],
        mutationFn: async () => {
            const res = await fetch(`http://localhost:4000/api/user/followUser/${userId}`, {
                method: 'POST',
                credentials: 'include'
            })  
            const data = await res.json()
            if(data.error) throw new Error(data.error) 
            return data
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['following'] })

            const previousState = queryClient.getQueryData<boolean>(['following'])

            queryClient.setQueryData(['following'], (!previousState))

            return { previousState }
        },
        onError(error, variables, context) {
            queryClient.setQueryData(['following'], () => context?.previousState ? context?.previousState : false)
            toast.error('failed to follow')
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profileInfo'] })
        }
    })

    // optimistic update unfollow
    const { mutate: unfollowMutate, isPending: unfollowisPending } = useMutation({
        mutationKey: ['unfollowUser'],
        mutationFn: async () => {
            const res = await fetch(`http://localhost:4000/api/user/unfollowUser/${userId}`, {
                method: 'POST', 
                credentials: 'include' 
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data
        },
        onMutate: async () => {
            
            await queryClient.cancelQueries({ queryKey: ['following'] })

            const previousState = queryClient.getQueryData<boolean>(['following'])

            queryClient.setQueryData(['following'], (!previousState))

            return { previousState }
            
        },
        onError(error, variables, context) {
            queryClient.setQueryData(['following'], () => context?.previousState ? context?.previousState : true)
            toast.error('failed to unfollow')
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profileInfo'] })
        }
    })


    return (
        <div className={'w-full flex items-center justify-center'}>
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

export default Follow