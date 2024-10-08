import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import Input from "@/PageComponents/Input"
import { ChangeEvent, FormEvent, useState } from "react"
import useSignUp from "./useSignUp.hooks"
import LoadingSpinner from "@/PageComponents/LoadingSpinner"

export type SignUpInfoType = {
  username: string,
  password: string,
  email: string
}

const SignUp = () => {
  const [signUp, setSignUp] = useState<SignUpInfoType>({
    username: '',
    password: '',
    email: ''
  })
  
  const { loading, signup } = useSignUp()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setSignUp((prev) => ({
      ...prev,
      [name]: e.target.value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signup(signUp)
  }

  return (
    <div className="h-[863px] w-full overflow-hidden flex justify-center items-center">
      <Card 
      className="shadow-md dark:shadow-slate-800">
        <form 
        onSubmit={handleSubmit}
        className="p-5 px-7 flex flex-col gap-4 w-[400px]">

          <CardTitle className="text-4xl">
            Sign Up
          </CardTitle>
          
          <CardContent className="flex flex-col my-3 pb-0 px-0">

            <Input 
            value={signUp.username}
            label="username"
            name="username"
            type="text"
            callbackFunction={handleChange}
            />

            <Input 
            value={signUp.password}
            label="password"
            name="password"
            type="password"
            callbackFunction={handleChange}
            />

            <Input 
            value={signUp.email}
            label="email (optional)"
            name="email"
            type="text"
            callbackFunction={handleChange}
            />

          </CardContent>

          <CardFooter>
            <Button 
            className="w-[300px]"
            disabled={loading}
            type='submit' variant={'default'}>
              {loading ? 
              <div className="w-full flex justify-center">
                <LoadingSpinner className="h-7 w-7" />
              </div>
              : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignUp