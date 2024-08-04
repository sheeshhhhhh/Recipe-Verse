import { useState } from 'react'
import { LoginInfoType } from './Login'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const login = async (loginInfo: LoginInfoType) => {
    if(!loginInfo.username || !loginInfo.password) return
    setLoading(true)
    try {
      const res: Response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginInfo),
        credentials: 'include'
      })
      console.log(res)
      const data = await res.json()
      
      if(data.error) throw new Error(data.error)

      navigate('/explore')
    } catch (error: any) {
        console.log('Error in the useLogin hook Error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin