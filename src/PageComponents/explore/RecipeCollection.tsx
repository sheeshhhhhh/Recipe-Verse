import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Recipe } from "@/Pages/Explore/Explore"
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import RecipeSkeleton from "./RecipeSkeleton";

type RecipeCollectionProps = {
  recipeCollection: Recipe[],
  loading: boolean
}

const RecipeCollection = ({
  loading,
  recipeCollection
} : RecipeCollectionProps) => {
    const stars = [1, 2, 3, 4, 5]
    
    
    if(loading) return <RecipeSkeleton />

    return (
      <div className="w-full grid grid-cols-4 gap-5">
          {recipeCollection?.map((item) => {
            return (
              <Card className="flex flex-col items-center w-[280px] shadow-md">
                <CardHeader className="p-3">

                  <img 
                  className="w-[250px] h-[180px]"
                  src="https://www.allrecipes.com/thmb/N3hqMgkSlKbPmcWCkHmxekKO61I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_1x2_2425-c67720e4ea884f22a852f0bb84a87a80.jpg" />

                  <CardTitle className="text-xl">{item.title}</CardTitle>

                  <div className="flex">
                    {stars.map((value) => {

                      const isStar = item.rating >= value // will define wheter it's a star base on value of the item
                      const isHalfStar = !isStar && value - 0.6 < item.rating // if it's not a star but not bigger than 0.4 of previous value then it is a half star
                      // confusing 

                      return (
                        <div>
                          {isStar && <FaStar />}
                          {isHalfStar && <FaStarHalf />}
                        </div>
                      )
                    })}
                    <CardDescription>{item.rating} Average</CardDescription>
                  </div>

                  <div className="flex gap-2 items-center">
                    {item.tags.map((item, idx) => {
                      if(idx === 3) return <CardDescription>etc...</CardDescription> 
                      // put etc... to the last index because we only allow up to 3 and 4 indedx is valued 3

                      if(idx > 3) return // return so nothing gets rendered

                      return (
                        <div>
                          <CardDescription className="font-medium">{item},</CardDescription>
                        </div>
                      )
                    })}
                  </div>

                  <CardDescription className="font-bold">Cost: ${item.cost}</CardDescription>
                  
                  <CardDescription>Cooking Time: {item.cookingTime}</CardDescription>

                </CardHeader>
              </Card>
            )
          })}
      </div>
    )
}

export default RecipeCollection