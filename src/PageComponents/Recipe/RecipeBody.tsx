
import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import AvatarProfile from "../AvatarProfile"
import { Recipe } from "@/Pages/Explore/Explore"
import { format } from 'date-fns'

type Author = {
    id: string,
    name: string,
    profile: string,
    createAt: Date,
}

type RecipeBodyType = {
    createdAt: Date
    recipe: Partial<Recipe & {
        createdAt: Date
    }>,
    author: Author
}

const RecipeBody = ({
    createdAt,
    recipe,
    author
} : RecipeBodyType) => {


    // do late
    return (
        <main>
            <Card className="w-[875px]">
                    <div>
                        {/* put slider here later */}
                        <img 
                         className="w-auto h-auto rounded-t-lg px-[1px]"
                         src="https://www.allrecipes.com/thmb/N3hqMgkSlKbPmcWCkHmxekKO61I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_1x2_2425-c67720e4ea884f22a852f0bb84a87a80.jpg" />
                    </div>
                <CardHeader className="pt-[32px] px-[64px] pb-0">
                    {/* <div className="flex gap-3 pl-6">
                        
                        <div className="">
                            <AvatarProfile authorProfile={author.profile} authorName={author.name} />
                            <CardTitle className="text-base">{author.name}</CardTitle>
                            <CardDescription>joined in {format(new Date(author.createAt), 'PPP')}</CardDescription>
                        </div>
                    </div> */}
                    <div className="mb-3">
                         <CardTitle className="text-5xl font-bold">{recipe.title}</CardTitle>
                         <CardDescription className="ml-5 mt-2">publish in {format(new Date(createdAt), 'MM-dd-yyyy')}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="py-[35px] px-[64px]">
                    <p className="max-w-[745px] indent-7">
                        {recipe.description}
                    </p>
                </CardContent>
            </Card>
        </main>
    )
}

export default RecipeBody