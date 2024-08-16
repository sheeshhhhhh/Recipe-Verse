import { ChangeEvent, Dispatch, SetStateAction } from "react";

type FileOnDragEvent = React.DragEvent<HTMLLabelElement>

export const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setProfile: Dispatch<SetStateAction<any>>,
    setRenderedProfile: Dispatch<SetStateAction<any>>
) => {
    if(!e.target.files) return
    const file = e.target.files[0]
    setProfile(file)

    if(file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
            setRenderedProfile(e.target.result)
        }
        reader.readAsDataURL(file)
    }
}

export const handleDrop = (
    e: FileOnDragEvent,
    setProfile: Dispatch<SetStateAction<any>>,
    setRenderedProfile: Dispatch<SetStateAction<any>>
) => {
    e.preventDefault()
    if(!e.dataTransfer.files[0]) return
    const file = e.dataTransfer.files[0]
    setProfile(file)

    if(file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setRenderedProfile(e.target.result)
        }
        reader.readAsDataURL(file)
    }
}

export const handleDrag = (
    e: FileOnDragEvent
) => {
    e.preventDefault()
}