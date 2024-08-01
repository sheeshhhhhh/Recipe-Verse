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
  

type DraftSettingProps = {
    recipeId: string
}

const DraftSetting = ({
    recipeId
} : DraftSettingProps) => {

    if(!recipeId) return 

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
                        <PencilIcon className="mr-3 h-6 w-6"/>
                        <span className="text-base font-medium">Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash2Icon className="mr-3 h-6 w-6" />
                        <span className="text-base font-medium">Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UploadIcon className="mr-3 h-6 w-6" />
                        <span className="text-base font-medium">Upload</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        
    )
}

export default DraftSetting