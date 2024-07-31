
import useDebounce from "@/lib/useDebounce"
import Filter from "@/PageComponents/explore/Filter"
import RecipeCollection from "@/PageComponents/explore/RecipeCollection"
import ExploreSearch from "@/PageComponents/explore/Search"
import { useEffect, useState } from "react"

export type FilterType = {
    search?: string
    mealType?: string,
    cuisine?: string,
    mealPreference?: string,
    cost?: number
}

export type Recipe = {
    title: string,
    image: string[] | undefined,
    description: string,
    ingredients: string [],
    cookingTime: string,
    servings: number,
    rating: number,
    tags: string [],
    callToAction: string,
    cost: number,
    mealType?: string,
    cuisine?: string,
    mealPreference?: string,
    instruction: string
}
// example data
const recipeCards: Recipe[] = [
    {
      title: "Spaghetti Carbonara",
      image: undefined,
      description: "Classic Italian pasta with creamy sauce and pancetta.",
      ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
      cookingTime: "30 mins",
      servings: 4,
      rating: 4.5,
      tags: ["Italian", "Quick", "Comfort Food"],
      callToAction: "View Recipe",
      cost: 15 // assuming the cost is in dollars
    },
    {
      title: "Vegan Buddha Bowl",
      image: undefined,
      description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
      ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
      cookingTime: "25 mins",
      servings: 2,
      rating: 4.7,
      tags: ["Vegan", "Healthy", "Quick"],
      callToAction: "View Recipe",
      cost: 10 // assuming the cost is in dollars
    },
    {
      title: "Chicken Tikka Masala",
      image: undefined,
      description: "Spiced chicken in a creamy tomato sauce, served with rice.",
      ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
      cookingTime: "45 mins",
      servings: 4,
      rating: 4.8,
      tags: ["Indian", "Spicy", "Comfort Food"],
      callToAction: "View Recipe",
      cost: 20 // assuming the cost is in dollars
    },
    {
      title: "Chocolate Chip Cookies",
      image: undefined,
      description: "Classic chewy cookies with gooey chocolate chips.",
      ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
      cookingTime: "20 mins",
      servings: 24,
      rating: 4.9,
      tags: ["Dessert", "Baking", "Quick"],
      callToAction: "View Recipe",
      cost: 8 // assuming the cost is in dollars
    },
    {
        title: "Spaghetti Carbonara",
        image: undefined,
        description: "Classic Italian pasta with creamy sauce and pancetta.",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
        cookingTime: "30 mins",
        servings: 4,
        rating: 4.5,
        tags: ["Italian", "Quick", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 15 // assuming the cost is in dollars
      },
      {
        title: "Vegan Buddha Bowl",
        image: undefined,
        description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
        ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
        cookingTime: "25 mins",
        servings: 2,
        rating: 4.7,
        tags: ["Vegan", "Healthy", "Quick"],
        callToAction: "View Recipe",
        cost: 10 // assuming the cost is in dollars
      },
      {
        title: "Chicken Tikka Masala",
        image: undefined,
        description: "Spiced chicken in a creamy tomato sauce, served with rice.",
        ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
        cookingTime: "45 mins",
        servings: 4,
        rating: 4.8,
        tags: ["Indian", "Spicy", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 20 // assuming the cost is in dollars
      },
      {
        title: "Chocolate Chip Cookies",
        image: undefined,
        description: "Classic chewy cookies with gooey chocolate chips.",
        ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
        cookingTime: "20 mins",
        servings: 24,
        rating: 4.9,
        tags: ["Dessert", "Baking", "Quick"],
        callToAction: "View Recipe",
        cost: 8 // assuming the cost is in dollars
      },
      {
        title: "Spaghetti Carbonara",
        image: undefined,
        description: "Classic Italian pasta with creamy sauce and pancetta.",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
        cookingTime: "30 mins",
        servings: 4,
        rating: 4.5,
        tags: ["Italian", "Quick", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 15 // assuming the cost is in dollars
      },
      {
        title: "Vegan Buddha Bowl",
        image: undefined,
        description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
        ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
        cookingTime: "25 mins",
        servings: 2,
        rating: 4.7,
        tags: ["Vegan", "Healthy", "Quick"],
        callToAction: "View Recipe",
        cost: 10 // assuming the cost is in dollars
      },
      {
        title: "Chicken Tikka Masala",
        image: undefined,
        description: "Spiced chicken in a creamy tomato sauce, served with rice.",
        ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
        cookingTime: "45 mins",
        servings: 4,
        rating: 4.8,
        tags: ["Indian", "Spicy", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 20 // assuming the cost is in dollars
      },
      {
        title: "Chocolate Chip Cookies",
        image: undefined,
        description: "Classic chewy cookies with gooey chocolate chips.",
        ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
        cookingTime: "20 mins",
        servings: 24,
        rating: 4.9,
        tags: ["Dessert", "Baking", "Quick"],
        callToAction: "View Recipe",
        cost: 8 // assuming the cost is in dollars
      },
      {
        title: "Spaghetti Carbonara",
        image: undefined,
        description: "Classic Italian pasta with creamy sauce and pancetta.",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
        cookingTime: "30 mins",
        servings: 4,
        rating: 4.5,
        tags: ["Italian", "Quick", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 15 // assuming the cost is in dollars
      },
      {
        title: "Vegan Buddha Bowl",
        image: undefined,
        description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
        ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
        cookingTime: "25 mins",
        servings: 2,
        rating: 4.7,
        tags: ["Vegan", "Healthy", "Quick"],
        callToAction: "View Recipe",
        cost: 10 // assuming the cost is in dollars
      },
      {
        title: "Chicken Tikka Masala",
        image: undefined,
        description: "Spiced chicken in a creamy tomato sauce, served with rice.",
        ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
        cookingTime: "45 mins",
        servings: 4,
        rating: 4.8,
        tags: ["Indian", "Spicy", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 20 // assuming the cost is in dollars
      },
      {
        title: "Chocolate Chip Cookies",
        image: undefined,
        description: "Classic chewy cookies with gooey chocolate chips.",
        ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
        cookingTime: "20 mins",
        servings: 24,
        rating: 4.9,
        tags: ["Dessert", "Baking", "Quick"],
        callToAction: "View Recipe",
        cost: 8 // assuming the cost is in dollars
      },
      {
        title: "Spaghetti Carbonara",
        image: undefined,
        description: "Classic Italian pasta with creamy sauce and pancetta.",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
        cookingTime: "30 mins",
        servings: 4,
        rating: 4.5,
        tags: ["Italian", "Quick", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 15 // assuming the cost is in dollars
      },
      {
        title: "Vegan Buddha Bowl",
        image: undefined,
        description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
        ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
        cookingTime: "25 mins",
        servings: 2,
        rating: 4.7,
        tags: ["Vegan", "Healthy", "Quick"],
        callToAction: "View Recipe",
        cost: 10 // assuming the cost is in dollars
      },
      {
        title: "Chicken Tikka Masala",
        image: undefined,
        description: "Spiced chicken in a creamy tomato sauce, served with rice.",
        ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
        cookingTime: "45 mins",
        servings: 4,
        rating: 4.8,
        tags: ["Indian", "Spicy", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 20 // assuming the cost is in dollars
      },
      {
        title: "Chocolate Chip Cookies",
        image: undefined,
        description: "Classic chewy cookies with gooey chocolate chips.",
        ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
        cookingTime: "20 mins",
        servings: 24,
        rating: 4.9,
        tags: ["Dessert", "Baking", "Quick"],
        callToAction: "View Recipe",
        cost: 8 // assuming the cost is in dollars
      },
      {
        title: "Spaghetti Carbonara",
        image: undefined,
        description: "Classic Italian pasta with creamy sauce and pancetta.",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
        cookingTime: "30 mins",
        servings: 4,
        rating: 4.5,
        tags: ["Italian", "Quick", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 15 // assuming the cost is in dollars
      },
      {
        title: "Vegan Buddha Bowl",
        image: undefined,
        description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
        ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
        cookingTime: "25 mins",
        servings: 2,
        rating: 4.7,
        tags: ["Vegan", "Healthy", "Quick"],
        callToAction: "View Recipe",
        cost: 10 // assuming the cost is in dollars
      },
      {
        title: "Chicken Tikka Masala",
        image: undefined,
        description: "Spiced chicken in a creamy tomato sauce, served with rice.",
        ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
        cookingTime: "45 mins",
        servings: 4,
        rating: 4.8,
        tags: ["Indian", "Spicy", "Comfort Food"],
        callToAction: "View Recipe",
        cost: 20 // assuming the cost is in dollars
      },
      {
        title: "Chocolate Chip Cookies",
        image: undefined,
        description: "Classic chewy cookies with gooey chocolate chips.",
        ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
        cookingTime: "20 mins",
        servings: 24,
        rating: 4.9,
        tags: ["Dessert", "Baking", "Quick"],
        callToAction: "View Recipe",
        cost: 8 // assuming the cost is in dollars
      }
];

const Explore = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [recipeCollection, setRecipeCollection] = useState<Recipe []>(recipeCards)// any for now
    const [filter, setFilter] = useState<FilterType>({
        search: undefined,
        mealType: undefined,
        cuisine: undefined,
        mealPreference: undefined,
        cost: undefined
    })
    const debounce = useDebounce(filter, 500) // so that we don't need to request that often
    
    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true)
            try {
                const res: Response = await fetch('http://localhost:3000/api/recipe/getRecipe', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(filter),
                    credentials: 'include'
                })

                const data = await res.json()

                if (data.error) throw new Error(data.error)

                setRecipeCollection(data)
            } catch (error: any) {
                console.log(`Error in the fetchRecipe useEffect function Error: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }
        
    }, [debounce])

    return (
        <div className="pt-10 flex-col mx-52">
            <div aria-label="search" className="mr-36 flex items-end">
                <ExploreSearch input={filter.search} setInput={setFilter} />
            </div>
            <div className="flex gap-2 pt-2">
                <div 
                className="border-r-2"
                aria-label="filter">
                    <Filter filter={filter} setFilter={setFilter} />
                </div>
                <div 
                className="p-4 pl-5"
                aria-label="card recipe">
                    <RecipeCollection 
                    loading={loading}
                    recipeCollection={recipeCollection}
                    />
                </div>
            </div>
        </div>
    )
}

export default Explore