import React, { useState } from 'react'
import { LoginInfoType } from './Login'

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (loginInfo: LoginInfoType) => {
    if(!loginInfo.username || !loginInfo.password) return
    setLoading(true)
    try {
      const res: Response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginInfo),
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error) throw new Error(data.error)

      // handle login properly later
    } catch (error: any) {
      console.log('Error in the useLogin hook Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin