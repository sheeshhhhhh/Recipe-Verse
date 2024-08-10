
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

type ImageCarouselProps = {
    images: string[]
}

const ImageCarousel = ({
    images
}: ImageCarouselProps) => {
    const [curr, setCurr] = useState<number>(0)

    // allow to go but if it is the first or last then won't move
    const prev = () => setCurr(curr =>  curr === 0 ? 0 : curr - 1)
    const next = () => setCurr(curr => curr === images.length - 1 ? images.length - 1 : curr + 1) 

    return (
        <div className="overflow-hidden relative">
            <div 
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {images?.map((image) => (
                    <div className="min-w-[873px] h-auto flex items-center justify-center">
                        <img 
                        loading="lazy"
                        width={873}
                        className="h-auto w-auto rounded-t-lg px-[1px] bg-cover max-h-[580px]" 
                        src={image}  />
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                disabled={curr === 0} // if it's the first then they should be able to go to prev no more
                variant={'outline'}
                onClick={prev}
                className="p-1 rounded-full shadow bg-white/80 
                hover:bg-white">
                    <ChevronLeft />
                </Button>
                <Button 
                disabled={curr === images.length - 1}
                variant={'outline'}
                onClick={next}
                className="p-1 rounded-full shadow bg-white/80 
                hover:bg-white">
                    <ChevronRight />
                </Button>
            </div>
            <div></div>
        </div>
    )

}

export default ImageCarousel