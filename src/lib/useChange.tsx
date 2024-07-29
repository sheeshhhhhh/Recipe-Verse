import { ChangeEvent, Dispatch, SetStateAction } from "react"


function useChange<T>()  {

    const handleChangeString = (name: string, value: string, setter: Dispatch<SetStateAction<T>>) => {
        setter((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeNumber = (name: string, value: number, setter: Dispatch<SetStateAction<T>>) => {
        setter((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeObject = (e: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<T>>) => {
        // name: is the useState name in the object
        const { name, type } = e.target
        if(!name) throw new Error('Name is required as a props to the input itself because it is the identifier')
    
        const isNumber = type === 'number' // for handling number values

        setter((prev) => ({
            ...prev,
            [name]: isNumber ? e.target.valueAsNumber : e.target.value
        }))
    }

    return { handleChangeString, handleChangeNumber, handleChangeObject }
}

export default useChange