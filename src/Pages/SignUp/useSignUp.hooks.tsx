import { useState } from "react"
import { SignUpInfoType } from "./SignUp"

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const signup = async (signUpInfo: SignUpInfoType) => {
    if(!signUpInfo.username || !signUpInfo.password) return
    setLoading(true)
    try {
      const res: Response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(signUpInfo),
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error) throw new Error(data.error)

      // handle if signUp properly
    } catch (error: any) {
      console.log(`Error in the useSignUp hook Error: ${error.message}`)
      // put toast here that says the error
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}

export default useSignUp