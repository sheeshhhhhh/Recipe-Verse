
import useDebounce from "@/lib/useDebounce"
import Filter from "@/PageComponents/explore/Filter"
import RecipeCollection from "@/PageComponents/explore/RecipeCollection"
import RecipeSkeleton from "@/PageComponents/explore/RecipeSkeleton"
import ExploreSearch from "@/PageComponents/explore/Search"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export type FilterType = {
    search?: string
    mealType?: string,
    cuisine?: string,
    mealPreference?: string,
    cost?: number
}

export type Recipe = {
    rating: number,
    title: string,
    image: string[] | undefined,
    description: string,
    ingredients: string [],
    cookingTime: string,
    servings: number,
    callToAction: string,
    cost: number,
    mealType?: string,
    cuisine?: string,
    mealPreference?: string,
    instruction: string
}
// example data
// const recipeCards: Recipe[] = [
//   {
//       title: "Spaghetti Carbonara",
//       image: ["url1.jpg", "url2.jpg"], // replace with actual image URLs or file objects
//       description: "Classic Italian pasta with creamy sauce and pancetta.",
//       ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
//       cookingTime: "30 mins",
//       servings: 4,
//       rating: 4.5,
//       callToAction: "View Recipe",
//       cost: 15, // assuming the cost is in dollars
//       mealType: "Dinner",
//       cuisine: "Italian",
//       mealPreference: "Non-Vegetarian",
//       instruction: "1. Cook spaghetti according to package instructions. 2. In a bowl, mix eggs and Parmesan. 3. In a pan, cook pancetta until crispy. 4. Toss spaghetti with pancetta, then remove from heat and mix in egg mixture. 5. Serve immediately with additional Parmesan and pepper."
//   },
//   {
//       title: "Vegan Buddha Bowl",
//       image: undefined,
//       description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
//       ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
//       cookingTime: "25 mins",
//       servings: 2,
//       rating: 4.7,
//       callToAction: "View Recipe",
//       cost: 10, // assuming the cost is in dollars
//       instruction: "1. Cook quinoa as per package instructions. 2. Roast chickpeas with your favorite spices. 3. Slice avocado and prepare spinach. 4. Assemble the bowl with quinoa, chickpeas, avocado, spinach, and a drizzle of tahini dressing. 5. Toss and enjoy."
//   },
//   {
//       title: "Chicken Tikka Masala",
//       image: undefined,
//       description: "Spiced chicken in a creamy tomato sauce, served with rice.",
//       ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
//       cookingTime: "45 mins",
//       servings: 4,
//       rating: 4.8,
//       callToAction: "View Recipe",
//       cost: 20, // assuming the cost is in dollars
//       instruction: "1. Marinate chicken in yogurt and spices. 2. Cook marinated chicken until tender. 3. Prepare a tomato-based sauce with spices and mix in the cooked chicken. 4. Serve with rice or naan bread."
//   },
//   {
//       title: "Chocolate Chip Cookies",
//       image: undefined,
//       description: "Classic chewy cookies with gooey chocolate chips.",
//       ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
//       cookingTime: "20 mins",
//       servings: 24,
//       rating: 4.9,
//       callToAction: "View Recipe",
//       cost: 8, // assuming the cost is in dollars
//       instruction: "1. Preheat the oven to 350°F (175°C). 2. Cream together butter and sugar. 3. Beat in eggs and mix in flour and chocolate chips. 4. Drop spoonfuls of dough onto a baking sheet. 5. Bake for 10-12 minutes and let cool before serving."
//   },
//   {
//       title: "Spaghetti Carbonara",
//       image: undefined,
//       description: "Classic Italian pasta with creamy sauce and pancetta.",
//       ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
//       cookingTime: "30 mins",
//       servings: 4,
//       rating: 4.5,
//       callToAction: "View Recipe",
//       cost: 15, // assuming the cost is in dollars
//       instruction: "1. Cook spaghetti according to package instructions. 2. In a bowl, mix eggs and Parmesan. 3. In a pan, cook pancetta until crispy. 4. Toss spaghetti with pancetta, then remove from heat and mix in egg mixture. 5. Serve immediately with additional Parmesan and pepper."
//   },
//   {
//       title: "Vegan Buddha Bowl",
//       image: undefined,
//       description: "A vibrant bowl of quinoa, vegetables, and tahini dressing.",
//       ingredients: ["Quinoa", "Chickpeas", "Avocado", "Spinach", "Tahini"],
//       cookingTime: "25 mins",
//       servings: 2,
//       rating: 4.7,
//       callToAction: "View Recipe",
//       cost: 10, // assuming the cost is in dollars
//       instruction: "1. Cook quinoa as per package instructions. 2. Roast chickpeas with your favorite spices. 3. Slice avocado and prepare spinach. 4. Assemble the bowl with quinoa, chickpeas, avocado, spinach, and a drizzle of tahini dressing. 5. Toss and enjoy."
//   },
//   {
//       title: "Chicken Tikka Masala",
//       image: undefined,
//       description: "Spiced chicken in a creamy tomato sauce, served with rice.",
//       ingredients: ["Chicken", "Tomatoes", "Yogurt", "Spices", "Rice"],
//       cookingTime: "45 mins",
//       servings: 4,
//       rating: 4.8,
//       callToAction: "View Recipe",
//       cost: 20, // assuming the cost is in dollars
//       instruction: "1. Marinate chicken in yogurt and spices. 2. Cook marinated chicken until tender. 3. Prepare a tomato-based sauce with spices and mix in the cooked chicken. 4. Serve with rice or naan bread."
//   },
//   {
//       title: "Chocolate Chip Cookies",
//       image: undefined,
//       description: "Classic chewy cookies with gooey chocolate chips.",
//       ingredients: ["Flour", "Butter", "Sugar", "Chocolate Chips", "Eggs"],
//       cookingTime: "20 mins",
//       servings: 24,
//       rating: 4.9,
//       callToAction: "View Recipe",
//       cost: 8, // assuming the cost is in dollars
//       instruction: "1. Preheat the oven to 350°F (175°C). 2. Cream together butter and sugar. 3. Beat in eggs and mix in flour and chocolate chips. 4. Drop spoonfuls of dough onto a baking sheet. 5. Bake for 10-12 minutes and let cool before serving."
//   },
//   // (Additional entries omitted for brevity)
// ];


const Explore = () => {
    const [filter, setFilter] = useState<FilterType>({
        search: '',
        mealType: '',
        cuisine: '',
        mealPreference: '',
        cost: undefined
    })

    const { data, isLoading } = useQuery({
        queryKey: ['recipeCollection', filter],
        queryFn: async () => {
            const res = await fetch('http://localhost:4000/api/recipe/getRecipe',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(filter),
                credentials: 'include'
            })
            return res.json()
        },
        
    })
    // useEffect(() => {
    //     const fetchRecipe = async () => {
    //         try {
    //             setLoading(true)
    //             const res: Response = await fetch('http://localhost:4000/api/recipe/getRecipe', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type' : 'application/json'
    //                 },
    //                 body: JSON.stringify(filter),
    //                 credentials: 'include'
    //             })

    //             const data = await res.json()

    //             if (data.error) throw new Error(data.error)
                    
    //             setRecipeCollection(data)
    //         } catch (error: any) {
    //             console.log(`Error in the fetchRecipe useEffect function Error: ${error.message}`)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchRecipe()
    // }, [debounce])

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
                    loading={isLoading}
                    recipeCollection={data}
                    />   
                </div>
            </div>
        </div>
    )
}

export default Explore