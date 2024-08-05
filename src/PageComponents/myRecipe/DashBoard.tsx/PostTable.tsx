import { format } from "date-fns"
import { PostDataType } from "./Dashboard"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { HeartIcon, MessageSquareIcon, EyeIcon, MoreHorizontalIcon } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
  

type PostTableProps = {
    posts: PostDataType[],

}

const PostTable = ({
    posts
} : PostTableProps) => {
  return (
    <Card>
        <CardHeader className="px-8">
            <CardTitle>Posts</CardTitle>
            <CardDescription>Contains all the post you have</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[600px] overflow-y-auto">
                <Table>
                    <TableCaption>Post Stats</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xl py-2 w-[600px]">Title</TableHead>
                            <TableHead className="text-xl">Stats</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow>

                                <TableCell>
                                    <div>
                                        <h2 className="font-bold text-lg ">{post.recipe.title}</h2>
                                        <CardDescription>Publish: {format(new Date(post.createdAt), 'MM-dd-yyyy')}</CardDescription>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {
                                        post.status === 'draft' ? 
                                            <Badge className="text-base ml-5">{post.status}</Badge>
                                        :
                                        <div className="h-[55px] flex gap-4 items-center">
                                            <div title="likes"
                                            className="flex flex-col items-center">
                                                <HeartIcon />
                                                {post.likes}
                                            </div>
                                            <div title="comments"
                                            className="flex flex-col items-center">
                                                <MessageSquareIcon />
                                                {post._count.comments}
                                            </div>
                                            <div title="views"
                                            className="flex flex-col items-center">
                                                <EyeIcon />
                                                {post.views}
                                            </div>
                                        </div>
                                    }
                                </TableCell>

                                <TableCell>
                                    <MoreHorizontalIcon />
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                    <div className="">
                        {/* HAVING A HARD TIME ON PAGINATION DO LATER
                        
                        <Pagination>
                            <PaginationContent>

                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination> */}
                    </div>
                </Table>
            </div>
        </CardContent>
    </Card>
  )
}

export default PostTable