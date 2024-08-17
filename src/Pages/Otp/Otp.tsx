import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import ResendCode from "./ResendCode"

const Otp = () => {
    const [otp, setOtp]= useState<string[]>(Array(6).fill(''))
    const [seachParams, setSearchParams] = useSearchParams()
    const [time, setTime] = useState<number>()

    // impement showing time and also auto resending when time is up(optional)

    const next = seachParams.get('next');
    const userId = seachParams.get('id');
    const email = seachParams.get('email')

    if(!next || !userId || !email) {
        return <Navigate to={'/error?message=something is missing in the url'} />
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, inputIdx: number) => {
        setOtp((prev) => [...prev.map((data, idx) => (idx === inputIdx ? e.target.value : data))])

        // Focus the next input element if value is not empty and next sibling exists
        if(e.target.value && e.target.nextSibling) {
            (e.target.nextSibling as HTMLInputElement).focus()
        }
    }

    const handleKey = (e: KeyboardEvent<HTMLInputElement>, Inputidx: number) => {
        if(e.key === 'ArrowRight' && e.currentTarget.nextSibling) {
            (e.currentTarget.nextSibling as HTMLInputElement).focus()
        } else if (e.key === 'ArrowLeft' && e.currentTarget.previousSibling) {
            (e.currentTarget.previousSibling as HTMLInputElement).focus() 
        } else if(e.key === 'Backspace') {
            setOtp((prev) => [...prev.map((data, idx) => (idx === Inputidx ? '' : data))]);
            if(!otp[Inputidx]) {
                setOtp((prev) => [...prev.map((data, idx) => (idx === Inputidx - 1 ? '' : data))]);
                (e.currentTarget.previousSibling as HTMLInputElement).focus()
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent, idx: number) => {
        const clipboardData = e.clipboardData || window.Clipboard;
        const pasteData = clipboardData.getData('text')
        const values = pasteData.split("")

        setOtp((prevOtp) => {
            let updateOtp = [...prevOtp]

            values.forEach((value, i) => {
                const targetIndex = idx + i
                // if otp is still bigget which it will be because length is different from index
                // then continue to update the otp
                if(targetIndex < updateOtp.length) {
                    updateOtp[targetIndex] = value;
                }
            })

            return updateOtp
        })
    }

    const { mutate: submitOtp, isPending, error } = useMutation({
        mutationFn: async () => {
            const res = await fetch('http://localhost:4000/api/auth/verifyOtpCode', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    otp: otp.join(''),
                    userId: userId
                }),
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data
        },
        onSuccess: (data) => {
            if(data.success === true) {
                window.location.assign(`http://localhost:3000${next}`)
            } else if(data.success === false) {
                throw new Error(data.message)
            }
        }
    })
    

    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        OTP Code
                    </CardTitle>
                    <CardDescription>
                        You will receive a code in the email 
                        account registered in this user
                    </CardDescription>
                    <p className="font-medium">
                        Email: {" "} 
                        <span className="text-blue-500">
                            {email}
                        </span>
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center gap-2 mb-1">
                        {otp.map((value, idx) => {
                            return (
                                <input 
                                disabled={isPending} // when loading 
                                key={idx}
                                onKeyDown={(e) => handleKey(e, idx)}
                                onPaste={(e) => handlePaste(e, idx)}
                                autoFocus={idx === 0}
                                maxLength={1}
                                className="h-11 w-9 border text-center font-medium rounded-lg"
                                value={value}
                                type="text"
                                onChange={(e) => handleOnChange(e, idx)}
                                />
                            )
                        })}
                    </div>
                    <ResendCode userId={userId} />
                    {error?.message && 
                    <p className="text-red-600 font-medium">
                        {error.message}
                    </p>}
                </CardContent>
                <CardFooter>
                    
                    
                    <Button
                    onClick={() => submitOtp()}
                    disabled={isPending} // when loading
                    >    
                        Next
                    </Button>

                </CardFooter>
            </Card>
        </div>
    )
}

export default Otp