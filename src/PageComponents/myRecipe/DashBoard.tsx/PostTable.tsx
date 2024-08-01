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
                                    <h2 className="font-bold text-lg ">{post.title}</h2>
                                    <CardDescription>Publish: {format(post.createdAt, 'MM-dd-yyyy')}</CardDescription>
                                </div>
                            </TableCell>

                            <TableCell className="h-[85px] flex gap-4 items-center">
                                <div title="likes">
                                    <HeartIcon />
                                    {post.likes}
                                </div>
                                <div title="comments">
                                    <MessageSquareIcon />
                                    {post.comments}
                                </div>
                                <div title="views">
                                    <EyeIcon />
                                    {post.views}
                                </div>
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
        </CardContent>
    </Card>
  )
}

export default PostTable