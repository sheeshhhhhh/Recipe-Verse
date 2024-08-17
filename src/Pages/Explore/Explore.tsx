
import Filter from "@/PageComponents/explore/Filter"
import PaginationNav from "@/PageComponents/explore/Pagination"
import RecipeCollection from "@/PageComponents/explore/RecipeCollection"
import ExploreSearch from "@/PageComponents/explore/Search"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export type FilterType = {
    search?: string
    mealType?: string,
    cuisine?: string,
    mealPreference?: string,
    cost?: number
}

export type Recipe = {
    id: string,
    rating: number,
    title: string,
    image: string[] | File[],
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


const Explore = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'
    const [filter, setFilter] = useState<FilterType>({
        search: '',
        mealType: '',
        cuisine: '',
        mealPreference: '',
        cost: 0
    })

    const { data, isLoading } = useQuery({
        queryKey: ['recipeCollection', filter, page],
        queryFn: async () => {
            const res = await fetch('http://localhost:4000/api/recipe/getRecipe',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    ...filter,
                    page: parseInt(page)
                }),
                credentials: 'include'
            })
            return res.json()
        },
    })

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
                    <div className="mt-7">
                        <PaginationNav  
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore