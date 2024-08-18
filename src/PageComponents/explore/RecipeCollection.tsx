import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { memo } from "react";
import { Link } from "react-router-dom";

type RecipeCollectionProps = {
  recipeCollection: any[],
  loading: boolean
}

const RecipeCollection = ({
  recipeCollection,
  loading
} : RecipeCollectionProps) => {
    const stars = [1, 2, 3, 4, 5]
    // fix loading flickering later it's because of debounce use Effect
    if(loading) return //<RecipeSkeleton />
    if(recipeCollection.length === 0) return (
      <div className="w-[1161px] h-[710px]">
        <h2>No Items Found</h2>
      </div>
    )

    return (
      <div className="w-full max-w-[1161px] h-[710px] grid grid-cols-4 gap-5">
          {recipeCollection?.map((post, idx) => {
            const item = post.recipe

            return (
              <HoverCard key={idx} openDelay={300} closeDelay={0}>
                <HoverCardTrigger>
                  <Link to={`/recipe/${post.id}`}>
                    <Card className="flex flex-col items-center h-[345px] w-[280px] shadow-md">
                      <CardHeader className="p-3">

                        <img 
                        className="w-[250px] h-[180px]"
                        src="https://www.allrecipes.com/thmb/N3hqMgkSlKbPmcWCkHmxekKO61I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_1x2_2425-c67720e4ea884f22a852f0bb84a87a80.jpg" />

                        <CardTitle className="text-xl">{item.title}</CardTitle>

                        <div className="flex">
                          {stars.map((value, idx) => {

                            const isStar = item.rating >= value // will define wheter it's a star base on value of the item
                            const isHalfStar = !isStar && value - 0.6 < item.rating // if it's not a star but not bigger than 0.4 of previous value then it is a half star
                            // confusing 

                            return (
                              <div key={idx}>
                                {isStar && <FaStar />}
                                {isHalfStar && <FaStarHalf />}
                              </div>
                            )
                          })}
                          <CardDescription>{item.rating} Average Rating</CardDescription>
                        </div>

                        <div className="flex gap-2 items-center">
                          <CardDescription className="font-medium">{item.cuisine}</CardDescription>
                          <CardDescription className="font-medium">{item.mealPreference}</CardDescription>
                          <CardDescription className="font-medium">{item.mealType}</CardDescription>
                        </div>

                        <CardDescription className="font-bold">Cost: ${item.cost}</CardDescription>
                        
                        <CardDescription>Cooking Time: {item.cookingTime}</CardDescription>

                      </CardHeader>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" className="absolute bottom-full left-0 w-[300px] p-3 bg-white dark:bg-gray-900
                flex flex-col gap-1 cursor-pointer">
                  <CardTitle className="text-lg">
                    Description
                  </CardTitle>
                  <CardDescription className="text-base  h-fit">
                    {item.description}
                  </CardDescription>  
                </HoverCardContent>
              </HoverCard>
            )
          })}
      </div>
    )
}

export default memo(RecipeCollection)