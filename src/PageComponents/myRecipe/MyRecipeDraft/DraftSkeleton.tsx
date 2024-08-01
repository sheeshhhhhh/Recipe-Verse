import { Skeleton } from "@/components/ui/skeleton"
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
import { MoreHorizontalIcon, Search } from "lucide-react"

const DraftSkeleton = () => {
  return (
    <div>
        <div className='flex flex-col items-center px-10'>
            <div className='w-full flex justify-start h-[48px]'>
                <div className="relative mb-2 ml-auto flex-1 md:grow-0 items-center">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground " />
                    <Skeleton className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px] h-10" />
                </div>
            </div>
            <Table>
                <TableCaption>
                    <Skeleton className="h-[20px] w-72 mt-4" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="w-[60px] h-6" />
                        </TableHead>
                        <TableHead className="w-[100px]">
                            <Skeleton className="w-[95px] h-6" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-[95px] h-6" />
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array(6).fill(null).map((idx) => (
                        <TableRow key={idx} className="h-[73px]">
                            <TableCell className="w-[472px]">
                                <Skeleton className="h-[30px] w-[280px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-[30px] w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-[30px] w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <MoreHorizontalIcon className="text-muted-foreground" size={25} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableCell>
                        <Skeleton className="h-[28.5px] w-[200px]" />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableFooter>
            </Table>
        </div>
    </div>
  )
}

export default DraftSkeleton