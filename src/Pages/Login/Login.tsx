import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import LoadingSpinner from "@/PageComponents/LoadingSpinner"
import { Link } from "react-router-dom"
import useLogin from "./useLogin.hooks"
import { SubmitHandler, useForm } from 'react-hook-form'
import {Input} from '@/components/ui/input'

export type LoginInfoType = {
  username: string,
  password: string
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInfoType>()

  const { loading, login } = useLogin()


  const onSubmit: SubmitHandler<LoginInfoType> = async (loginInfo: LoginInfoType) => {

    await login(loginInfo)
  }


  return (
    <div className="h-[863px] w-full overflow-hidden flex justify-center items-center">
      <Card className="shadow-md dark:shadow-slate-800">
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 px-7 flex flex-col gap-4 w-[400px]">
          
          <CardTitle className="text-4xl">
            Login
          </CardTitle>

          <CardContent className="flex flex-col my-3 pb-0 px-0">
      
            <Input
            {...register('username', {
              required: 'username is required',
            })}
            name="username" 
            type="text"
            placeholder="Username"
            className="mb-2"
            />
            <p className="text-red-600 ml-4">{errors.username && errors.username.message}</p>

            <Input 
            {...register('password', {
              required: 'password is required'
            })}
            name={'password'}
            type={'password'}
            placeholder="Password"
            />
            <p className="text-red-600 ml-4">{errors.password && errors.password.message}</p>
            
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