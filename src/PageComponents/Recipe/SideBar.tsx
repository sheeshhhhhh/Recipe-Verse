import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BookmarkIcon, HeartIcon, MessageSquareIcon } from "lucide-react"
  
type SidebarProps = {
    postId: string,
    likesCount: number,
    favoritesCount: number,
    commentsCount: number,
}

const SideBar = ({
    postId,
    likesCount,
    favoritesCount,
    commentsCount
} : SidebarProps) => {



    return (
        <aside className='w-[64px] min-h-screen'>
            <nav className="flex flex-col gap-4 w-[64px] sticky top-[114px]">
                <TooltipProvider>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="w-full h-full">
                                <button className="w-full flex flex-col items-center px-[6px] py-[1px]">
                                    <div className="p-2">
                                        <HeartIcon className="size-[24px]" />
                                    </div>
                                    <p>{likesCount}</p>
                                </button>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Add Like</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="w-full h-full">
                                <a href="" className="w-full flex flex-col items-center px-[6px] py-[1px]">
                                    <div className="p-2">
                                        <MessageSquareIcon className="size-[24px]" />
                                    </div>
                                    <p>{commentsCount}</p>
                                </a>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Jump to<br/> Comments</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="w-full h-full">
                                <button className="w-full flex flex-col items-center px-[6px] py-[1px]">
                                    <div className="p-2">
                                        <BookmarkIcon className="size-[24px]" />
                                    </div>
                                    <p>{favoritesCount}</p>
                                </button>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Save</p>
                        </TooltipContent>
                    </Tooltip>

                </TooltipProvider>
            </nav>
        </aside>
    )
}

export default SideBar