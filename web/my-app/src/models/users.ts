import { useState, useCallback } from 'react'
import { stringify } from 'qs';

export default function useAuthModel() {
  const [user, setUser] = useState(null)

  const signin = useCallback((account, password) => {
      return fetch('http://127.0.0.1:9090/api/products').then(
        res => {
          console.log(res)
          return res.json()
        }
        );
    // signin implementation
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])

  return {
    user,
    signin,
    signout
  }
}
