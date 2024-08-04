import { Recipe } from '@/Pages/Explore/Explore'

const formData = (recipe: Recipe) => {
    const formData = new FormData()

    formData.append('title', recipe.title)
    formData.append('description', recipe.description)
    formData.append('cookingTime', recipe.cookingTime)
    formData.append('servings', recipe.servings.toString())
    formData.append('cost', recipe.cost.toString())
    if (recipe.mealType) formData.append('mealType', recipe.mealType)
    if (recipe.cuisine) formData.append('cuisine', recipe.cuisine)
    if (recipe.mealPreference) formData.append('mealPreference', recipe.mealPreference)
    formData.append('instruction', recipe.instruction)

    // Append each image in the array
    if (recipe.image) {
        recipe.image.forEach((img, index) => {
            formData.append(`image[${index}]`, img)
        })
    }

    // Append each ingredient in the array
    recipe.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient)
    })

    return formData
}

export default formData