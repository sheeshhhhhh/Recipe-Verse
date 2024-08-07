import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type AvatarProfileProps = {
  authorProfile: string,
  authorName: string,
  className?: string
}

const AvatarProfile = ({
  authorProfile,
  authorName,
  className
} : AvatarProfileProps) => {

  return (
    <Avatar className={cn('h-12 w-12', className)}>
        <AvatarImage src={authorProfile} alt={authorName}/>
        <AvatarFallback className="text-xl font-bold">{authorName[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarProfile