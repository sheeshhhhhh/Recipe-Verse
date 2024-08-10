
import { useAuthContext } from '@/context/authContext'
import AvatarProfile from '../AvatarProfile'
import { Author, childComment, Comment } from './RecipeBody'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { FormMessage } from '@/components/ui/form'
import { CardTitle } from '@/components/ui/card'
import LoadingSpinner from '../LoadingSpinner'

// implement likes, reply and delete in child comments
// and also make display comment dynamic for both comments and child comments
// or make displaychildComment component

type CommentsProps = {
  postId: string,  
  comments: Comment[]
}

const Comments = ({
  comments,
  postId
} : CommentsProps) => {

  const { user } = useAuthContext()

  return (
    <div id='comments' className='flex flex-col gap-2'>

      <CardTitle className='mb-3'>Comments</CardTitle>

      <CommentInput postId={postId} />

      <div className='flex flex-col gap-5'>
        {comments?.map((comment) => {
          
          const isAuthor = comment.user.id === user.id // introduce delete when is author
          
          return (
            <div key={comment.id}>
  
              <DisplayComment isAuthor={isAuthor} comment={comment} postId={postId} />

              <div aria-label='replyComments'>
                {comment?.childComments?.map((childComment) => {
                    
                    const childComment_isAuthor = user.id === childComment.user.id

                    return (
                      <div
                      className='pl-[64px] mt-2'
                      key={childComment.id}>
                        <DisplayComment isAuthor={childComment_isAuthor} comment={childComment} postId={postId} />
                      </div>
                    )
                  })}
              </div>
  
            </div>
          )
        })}
      </div>

    </div>
  ) 
}

type DisplayCommentProps = {
  isAuthor: boolean,
  comment: Comment | childComment,
  postId: string,
}

const DisplayComment = ({
  isAuthor,
  comment,
  postId
} : DisplayCommentProps) => {

  return (
    <div aria-label='comment' className='flex'>

      <AvatarProfile 
      className='mr-4'
      authorName={comment.user.name}
      authorProfile={comment.user.profile}
      />
    
      <div className='w-full'>
        <div className='rounded-lg border border-input bg-background px-4 py-2'>
          <div className='flex items-center'>
            <h2 className='mr-1 font-medium text-lg'>{comment.user.name}</h2>
            <li>{format(new Date(comment.createdAt), 'MMM dd')}</li>
          </div>
          <p className='text-lg mt-2 mb-4 '>{comment.body}</p>
        </div>
        {/* make this component later */}
        <CommentButton 
        isAuthor={isAuthor}
        postId={postId}
        commentId={comment.id}
        commentLikes={comment.likes}
        />
      </div>

    </div>
  )
}

type CommentInputProps = {
  postId: string
}

const CommentInput = ({
  postId
} : CommentInputProps) => {
  const [commentInput, setCommentInput] = useState<string>('')

  const queryClient = useQueryClient();
  const { user } = useAuthContext()
  if(!user) return // later impelment a log in to comment component

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if(!commentInput) throw new Error('comments empty!')

      const res = await fetch(`http://localhost:4000/api/post/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          comment: commentInput
        }),
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error) throw new Error(data.error)
      return data
    },
    onSuccess: async (data) => {
      // identify the data in the backend make sure it will be same as Comment type\
      // and make typing for data for cleaner look
      await queryClient.setQueryData(['Viewrecipe', postId], (oldData: any) => {
        return {
          ...oldData,
          comments: [
            ...oldData.comments,
            data
          ]
        }
      })

      setCommentInput('')
    },
    onError: (error) => {
      toast.error('comment failed')
      return error
    }
  }) 

  return (
    <div className='flex mb-6'>

      <AvatarProfile 
      className='mr-4 mt-3'
      authorProfile={user.profile} 
      authorName={user.name} />

      <form
      onSubmit={(e) => mutate(e) }
      >
        <Label
        className='text-lg'
        htmlFor='your-comment'>
          Your Comment
        </Label>
        <Textarea 
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        disabled={isPending}
        placeholder='Type your comment here'
        id='your-comment'
        className={`w-[680px] text-lg ${isError && 'border-red-500 placeholder:text-red-500'}`} />

        {commentInput && <div className='mt-2 flex justify-end pr-3'>
          <Button 
          type='submit'
          >
            Comment
          </Button>
        </div>}

      </form>
      {error && <FormMessage>{error.message}</FormMessage>}
    </div>
  )
}

type CommentButtonProps = {
  isAuthor: boolean,
  postId: string,
  commentId: string,
  commentLikes: number
}

const CommentButton = ({
  isAuthor,
  postId,
  commentId,
  commentLikes
} : CommentButtonProps) => {
  const [openReply, setOpenreply] = useState<boolean>(false)
  const queryClient = useQueryClient();

  const { mutate: likeComment, isPending: likesPending, data: like } = useMutation({
    mutationFn: async (commentId: string) => {
      const res = await fetch(`http://localhost:4000/api/post/likeComment/${commentId}`, {
        method: 'POST',
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error) throw new Error(data.error)
      if(!data?.success) throw new Error('like failed')

      return data
    }, 
    // optimistic updates
    onMutate(commentId) {
      queryClient.cancelQueries({ queryKey: ['Viewrecipe', postId] })

      const previousState = queryClient.getQueryData<any>(['Viewrecipe', postId])

      queryClient.setQueryData(['Viewrecipe', postId], (oldData: any) => {
        return {
          ...oldData,
          comments: [...oldData.comments.map((comment: Comment) => {
            if(comment.id === commentId) {
              comment.likes = comment.likes + 1
            }
            return comment
          })]
        }
      })

      return { previousState }
    },
    onError: (error, variables, context) => {
      toast.error(error.message)

      queryClient.setQueryData(['Viewrecipe', postId], context?.previousState)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['Viewrecipe', postId] })
    }
  })

  const { mutate: deleteComment, isPending: deletePending, variables: CommentId } = useMutation({
    mutationFn: async (commentId: string) => {
      const res = await fetch(`http://localhost:4000/api/post/deleteComment/${commentId}`, {
        method: 'POST',
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error) throw new Error(data.error)
      return data
    },
    onSuccess: (data, commentId) => {
      queryClient.setQueryData(['Viewrecipe', postId], (oldData: any) => {
        return {
          ...oldData,
          comments: [...oldData.comments.filter((comment: Comment) => comment.id !== commentId)]
        }
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  // implement reply to comments // kind of complex need to make another component
  // and implement delete Comment when author do so
  // implement unlike

  // fix later only can like one person because it depends on the data: like
  // should introduce like model in prisma

  const isLiked = commentId === like?.commentId

  return (
    <div>        
      {openReply ?

      <ReplyComment 
      setOpenreply={setOpenreply}
      postId={postId} 
      commentId={commentId} />
      
      :
      
      <div className='flex items-center gap-7 mt-1'>

        <Button 
        variant={'ghost'}
        disabled={likesPending}
        onClick={() => !isLiked && likeComment(commentId)} // making sure that cannot like again
        aria-label='likes'
        title='likes' 
        className='flex items-center p-2 cursor-pointer rounded-xl hover:bg-muted'
        >
          <ThumbsUpIcon className={`mr-2 ${isLiked && 'fill-blue-600 text-blue-600 transition-colors'}`} />
          <p className={`text-lg ${isLiked && 'text-blue-600 transition-colors'}`}>{commentLikes} likes </p>
        </Button>

        <Button 
        onClick={() => setOpenreply((prev) => !prev)}
        variant={'ghost'}
        aria-label='reply' 
        title='Reply' 
        className='flex items-center p-2 cursor-pointer rounded-xl hover:bg-muted'>
          <MessageCircleIcon className='mr-2' />
          <p className='text-lg '>Reply</p> 
        </Button>

        {isAuthor && 
          <div aria-label='deleteComment' className='flex items-center m-1 p-1 cursor-pointer rounded-xl hover:bg-muted' >
            {/* specifying deletePending and commentid for onely one loading when deleting */}
            <Button 
            className='flex items-center justify-center w-[126px] hover:'
            disabled={deletePending && CommentId === commentId}
            onClick={() => deleteComment(commentId)}
            size={'sm'}
            variant={'destructive'}
            >
              {deletePending && commentId === commentId ? <LoadingSpinner className='h-3 w-3' /> : 'deleteComment' } 
            </Button>
          </div>
        }
      </div>

    }
    </div>
  )
}

type ReplyCommentProps = {
  setOpenreply: Dispatch<SetStateAction<boolean>>,
  postId: string,
  commentId: string
}

const ReplyComment = ({
  postId,
  commentId,
  setOpenreply
} : ReplyCommentProps) => {
  const [replyInput, setReplyInput] = useState<string>('')

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const res = await fetch('http://localhost:4000/api/post/replyComment/' + commentId, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          comment: replyInput
        }),
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error) throw new Error(data.error)
      return data
    },
    onSuccess: (data: childComment, event, context) => {
      // updating the childs comment
      queryClient.setQueryData(['Viewrecipe', postId], (oldData: any) => {
        return {
          ...oldData,
          comments: [...oldData.comments.map((comment: Comment) => {
            if(comment.id === commentId) {
              comment.childComments = comment.childComments ? [...comment.childComments, data] : [data]
            }
            return comment
          })]
        }
      })

      setReplyInput('')
      setOpenreply(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['Viewrecipe', postId] })
    }
  })

  return (
    <div className='mt-3'>
      <div className='flex mb-6'>
    
        <form
        onSubmit={(e) => mutate(e)}
        >
          
          <Textarea 
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
          disabled={isPending}
          placeholder='Type your comment here'
          className={`w-[680px] text-lg ${isError && 'border-red-500 placeholder:text-red-500'} `} />
  
          <div className='mt-2 flex gap-2 justify-end pr-3'>
            
            <Button
            variant={'ghost'}
            type='button'
            onClick={() => setOpenreply(false)}
            >
              Dismiss
            </Button>

            <Button 
            disabled={!replyInput || isPending}
            type='submit'
            >
              Comment
            </Button>

          </div>
  
        </form>
        {error && <FormMessage>{error.message}</FormMessage>}
      </div>
    </div>
  )

}

export default Comments