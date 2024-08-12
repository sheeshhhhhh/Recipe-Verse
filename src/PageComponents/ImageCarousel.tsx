
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

type ImageCarouselProps = {
    images: string[],
    autoSlide?: boolean,
    Slideinterval?: number,
    size?: number
}

const ImageCarousel = ({
    images,
    autoSlide = false,
    Slideinterval = 2500,
    size = 873
}: ImageCarouselProps) => {
    const [curr, setCurr] = useState<number>(0)

    // for stopping autoSlide when user is using it
    // once change to true no going back
    const [changed, setChanged] = useState<boolean>(false) 

    const nav = (idx: number) => {
        setChanged(true)
        setCurr(curr => curr === idx ? curr : idx)
    }

    // allow to go but if it is the first or last then won't move
    const prev = () => {
        setChanged(true)
        setCurr(curr =>  curr === 0 ? 0 : curr - 1)
    }

    const next = () => {
        setChanged(true)
        setCurr(curr => curr === images.length - 1 ? images.length - 1 : curr + 1)
    } 

    useEffect(() => {
        if(!autoSlide) return
        if(changed) return 

        const AutoSlide = setInterval(() => 
            setCurr(curr => curr === images.length - 1 ? images.length - 1 : curr + 1), 
            Slideinterval
        )

        return () => {
            clearInterval(AutoSlide)
        }
        
    }, [changed])

    return (
        <div className="overflow-hidden relative rounded-t-lg">
            <div 
            className={"flex transition-transform ease-out duration-500 "}
            style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {images?.map((image) => {
                    return(
                    <div 
                    key={image} 
                    className={`w-full flex items-center justify-center bg-foreground`}
                    style={{ minWidth: `${size}px` }}
                    >
                        <img 
                        loading="lazy"
                        className={`w-auto w-auto rounded-t-lg bg-cover max-h-[580px]`} 
                        src={image}  
                        alt="carousel"
                        />
                    </div>
                    )
                })}
                
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                disabled={curr === 0} // if it's the first then they should be able to go to prev no more
                variant={'outline'}
                onClick={prev}
                className="p-1 rounded-full shadow ">
                    <ChevronLeft />
                </Button>
                <Button 
                disabled={curr === images.length - 1}
                variant={'outline'}
                onClick={next}
                className="p-1 rounded-full shadow ">
                    <ChevronRight />
                </Button>
            </div>
            <div className="absolute bottom-5 flex gap-2 justify-center items-center w-full">
                {images?.map((_, idx) => (
                    <div 
                    onClick={() => nav(idx)}
                    className={`bg-background rounded-full transition-all
                    ${curr === idx ? 'p-[4px] h-[12px] w-[12px]' : 'opacity-30 h-[10px] w-[10px]'}`}>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ImageCarousel