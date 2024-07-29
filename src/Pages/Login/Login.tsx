import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import Input from "@/PageComponents/Input"
import LoadingSpinner from "@/PageComponents/LoadingSpinner"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "./useLogin.hooks"

export type LoginInfoType = {
  username: string,
  password: string
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    username: '',
    password: '',
  })

  const { loading, login } = useLogin()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    setLoginInfo((prev) => ({
      ...prev,
      [name]: e.target.value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(loginInfo)
  }

  return (
    <div className="h-[863px] w-full overflow-hidden flex justify-center items-center">
      <Card className="shadow-md dark:shadow-slate-800">
        <form 
        onSubmit={handleSubmit}
        className="p-5 px-7 flex flex-col gap-4 w-[400px]">
          
          <CardTitle className="text-4xl">
            Login
          </CardTitle>

          <CardContent className="flex flex-col my-3 pb-0 px-0">
      
            <Input
            value={loginInfo.username}
            label="username"
            name="username"
            type="text"
            callbackFunction={handleChange}
            />
            
            <Input 
            value={loginInfo.password}
            label="password"
            name={'password'}
            type={'password'}
            callbackFunction={handleChange}
            />
              
            <p className="text-sm cursor-pointer ml-2 mt-2">Don't have an Account? {" "} 
              <Link className="font-medium text-blue-700 underline-offset-4 hover:underline" to={'/signUp'}>Sign Up</Link>
            </p>
          </CardContent>

          <CardFooter>
            <Button 
            className="w-[300px]"
            disabled={loading}
            type="submit" variant={'default'}>
              {loading ?
              <div className="w-full flex justify-center">
                <LoadingSpinner className="h-7 w-7" />
              </div>
              : "Login"}
            </Button>
          </CardFooter>
          
        </form>
      </Card>
    </div>
  )
}

export default Login