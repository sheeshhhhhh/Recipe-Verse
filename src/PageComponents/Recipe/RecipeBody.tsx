
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
import Comments from "./Comments"

export type Author = {
    id: string,
    name: string,
    profile: string,
    createAt: Date,
}

export type childComment = {
    id: string,
    commentId: string
    user: Author,
    body: string,
    likes: number,
    createdAt: Date
}

export type Comment = {
    id: string,
    user: Author,
    childComments: childComment[]
    postId: string,
    body: string,
    likes: number,
    createdAt: Date
}

type RecipeBodyType = {
    postId: string,
    createdAt: Date
    recipe: Partial<Recipe & {
        createdAt: Date
    }>,
    author: Author,
    comments: Comment[]
}

const RecipeBody = ({
    postId,
    createdAt,
    recipe,
    author,
    comments
} : RecipeBodyType) => {

    const cookingTime = (time: number): { time: number, unit: string}[] => {
        const isHour = time >= 60;
    
        if (!isHour) {
            return  [{
                time: time,
                unit: 'minutes'
            }]
        }
    
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
    
        return [
            {
                time: hours,
                unit: 'hours'
            },
            {
                time: minutes,
                unit: 'minutes'
            }
        ];
    };
        
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

                    <div className="flex gap-28 justify-center mb-5">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold">Meal Type</h2>
                            <p className="font-medium">{recipe.mealType}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold">Cuisine</h2>
                            <p className="font-medium">{recipe.cuisine}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold">Meal Preference</h2>
                            <p className="font-medium">{recipe.mealPreference}</p>
                        </div>

                    </div>

                    <p className="max-w-[745px] indent-7 text-xl font-semibold my-6">
                        {recipe.description}
                    </p>

                    <div className="my-4 flex gap-6">
                        {/* instrunction should be a array to just map the numbers later  */}
                        <div className="max-w-[450px]">
                            <h2 className="font-bold text-2xl mb-3">Instruction</h2>
                            <p className="text-lg">{recipe.instruction}</p>
                        </div>

                        <div className="pl-9">
                            <h2 className="font-bold text-2xl mb-3">Ingredient</h2>
                            {recipe.ingredients?.map((ingredient) => (
                                <li className="pl-2 text-lg">
                                    {ingredient}
                                </li>
                            ))}
                        </div>

                    </div>

                    <div className="m-4 pl-4 flex flex-col gap-4">

                            <div>
                                <h2 className="font-bold text-2xl mb-1">Cooking Time</h2>
                                {cookingTime(Number(recipe.cookingTime)).map((cookingTime) => {
                                    return (
                                        <div className="flex gap-1 px-2">
                                            <p className="text-lg font-medium">{cookingTime.time}</p>
                                            <h2 className="text-lg font-medium">{cookingTime.unit}</h2>
                                        </div>
                                    )
                                })}
                            </div>

                            <div>
                                <h2 className="font-bold text-2xl mb-1">Servings</h2>
                                <p className="text-lg font-medium px-2">can be diveded to {recipe.servings} different plates</p>
                            </div>

                    </div>
                </CardContent>
                <CardFooter className='py-[32px] px-[64px]'>
                    <Comments comments={comments} postId={postId} />
                </CardFooter>
            </Card>
        </main>
    )
}

export default RecipeBody