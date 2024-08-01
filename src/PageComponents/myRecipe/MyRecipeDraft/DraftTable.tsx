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
    uploadDraft: (recipeId: string) => Promise<{ error: any; } | undefined>,
    deleteDraft: (recipeId: string) => Promise<{ error: any; } | undefined>,
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
                {DraftData?.map((draft) => (
                    <TableRow>
                        <TableCell className="text-xl font-semibold">{draft.title}</TableCell>
                        <TableCell className="font-medium">{format(draft.updateAt, 'P')}</TableCell>
                        <TableCell className="font-medium">{format(draft.createAt, 'P')}</TableCell>
                        <TableCell>
                            <DraftSetting recipeId={draft.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell className="font-semibold text-lg">
                        Total Draft: {DraftData.length}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default DraftTable