
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
                    <p className="max-w-[745px] indent-7 text-xl font-semibold">
                        {recipe.description}
                    </p>
                    <div className="mt-4 flex gap-6">

                        <div className="pl-9">
                            <h2 className="font-bold text-2xl mb-3">Ingredient</h2>
                            {recipe.ingredients?.map((ingredient) => (
                                <li className="pl-2">
                                    {ingredient}
                                </li>
                            ))}
                        </div>

                        <div>
                            <h2 className="font-bold text-2xl mb-3">Cooking Time</h2>
                            {cookingTime(Number(recipe.cookingTime)).map((cookingTime) => {
                                return (
                                    <div className="flex gap-1">
                                        <p className="text-lg font-medium">{cookingTime.time}</p>
                                        <h2 className="text-lg font-medium">{cookingTime.unit}</h2>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    {/* do comments here */}
                </CardFooter>
            </Card>
        </main>
    )
}

export default RecipeBody