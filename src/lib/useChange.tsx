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
        const { name, type, value } = e.target
        if(!name) throw new Error('Name is required as a props to the input itself because it is the identifier')

        const isNumber = type === 'number' // for handling number values
        const numberValue = (value === "" ? 0 : Number(value)) // making it so that it is zero when accepting

        setter((prev) => ({
            ...prev,
            [name]: isNumber ? numberValue : e.target.value
        }))
    }

    const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>, setter: Dispatch<SetStateAction<T>>) => {
        const { name } = e.target
        if(!name) throw new Error('Name is required as a props to the textarea itself because it is the identifier')

        setter((prev) => ({
            ...prev,
            [name]: e.target.value
        }))
    }

    return { handleChangeString, handleChangeNumber, handleChangeObject, handleChangeTextArea }
}

export default useChange