import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DraftDataType } from "./MyRecipeDraft"
import { format } from 'date-fns'
import DraftSetting from "./DraftSetting"


type DraftTableProps = { 
    DraftData: DraftDataType[], // any for now
    uploadDraft: (postId: string) => Promise<{ error: any; } | undefined>,
    deleteDraft: (postId: string) => Promise<{ error: any; } | undefined>,
}

const DraftTable = ({
    DraftData,
    uploadDraft,
    deleteDraft
} : DraftTableProps) => {
    // handle Draft Settings

    return (
        <Table>
            {/* should have a title for Draft */}
            <TableCaption>All your unpublish or unfinish task</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-[100px]">Created</TableHead>
                    <TableHead>Updated</TableHead>
                    {/* put table in here for function or popover something like that */}
                </TableRow>
            </TableHeader>

            <TableBody>
                {DraftData?.map((draft) => {
                    const updatedTime = format(new Date(draft.updatedAt), 'MM-dd-yyyy')
                    const createTime = format(new Date(draft.createdAt), 'MM-dd-yyyy')
                    
                    return (
                        <TableRow key={draft.id}>
                            <TableCell className="text-xl font-semibold">{draft.recipe.title}</TableCell>
                            <TableCell className="font-medium w-[120px]">{createTime}</TableCell>
                            <TableCell className="font-medium">{updatedTime}</TableCell>
                            <TableCell>
                                <DraftSetting 
                                uploadDraft={uploadDraft}
                                deleteDraft={deleteDraft}
                                postId={draft.id} 
                                />
                            </TableCell>
                        </TableRow>
                    )
                })
                }
            </TableBody>
                
           {DraftData.length > 0 && <TableFooter>
                <TableRow>
                    <TableCell className="font-semibold text-lg">
                        Total Draft: {DraftData.length}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableFooter>}

        </Table>
    )
}

export default DraftTable