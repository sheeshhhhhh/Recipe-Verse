import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PencilIcon } from "lucide-react"
import { Trash2Icon } from "lucide-react"
import { UploadIcon } from 'lucide-react'
import { Link } from "react-router-dom"
  

type DraftSettingProps = {
    postId: string,
    deleteDraft: (postId: string) => Promise<void | { error : string}>,
    uploadDraft: (postId: string) => Promise<void | { error : string}>
}

const DraftSetting = ({
    postId,
    deleteDraft,
    uploadDraft
} : DraftSettingProps) => {

    if(!postId) return 

    return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className="focus-visible:ring-0 focus:ring-0 focus-visible:border-0">
                        <MoreHorizontal size={25} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side={'right'} align="start" className="w-40 px-2">
                    <DropdownMenuLabel>Draft Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link className="flex w-[142px]" to={`/myrecipe/edit/${postId}`}>
                            <PencilIcon className="mr-3 h-6 w-6"/>
                            <span className="text-base font-medium ">Edit</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={(e) => deleteDraft(postId)}
                    >
                        <Trash2Icon className="mr-3 h-6 w-6" />
                        <span className="text-base font-medium">Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={(e) => uploadDraft(postId)}
                    >
                        <UploadIcon className="mr-3 h-6 w-6" />
                        <span className="text-base font-medium">Upload</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        
    )
}

export default DraftSetting