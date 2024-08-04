import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const RecipeSkeleton = () => {
    

    return (
        <div className="w-full grid grid-cols-4 gap-5">
            {Array(8).fill(null).map((value, idx) => {
                return (
                    <Card key={idx} className="flex flex-col items-center w-[280px] shadow-md">
                        <CardHeader className="p-3">
                            <Skeleton className="w-[250px] h-[180px]" />

                            <Skeleton className="w-[200px] h-[20px] mt-[6px]" />

                            <div className="flex mt-[6px] gap-2">
                                <Skeleton className="w-[80px] h-[20px]" />
                                <Skeleton className="w-[150px] h-[20px]" />
                            </div>

                            <Skeleton className="h-[14px] w-[200px] mt-[6px]" />

                            <Skeleton className="h-[20px] mt-[6px]" />

                            <Skeleton className="h-[20px] w-[150px] mt-[6px]" />
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
    )
}

export default RecipeSkeleton