import { Button, Card, CircularProgress, Input } from "@nextui-org/react";
import { FunctionComponent, useEffect, useState } from "react";
import styled from 'styled-components'
import { checkAuth, login } from "../../api/fetch/user";
import { enqueueSnackbar } from "notistack";

interface Props {
  handleAuth: () => void
}

export const LoginScreen:FunctionComponent<Props> = ({ 
  handleAuth
}) => {
  const [loading, handleLoading] = useState(true)
  const [username, handleUsername] = useState('')
  const [password, handlePassword] = useState('')

  useEffect(() => {
    const initMain = async() => {
      const success = await checkAuth()
      console.log("🚀 ~ initMain ~ success:", success)
      success ? handleAuth() : handleLoading(false)      
    }

    initMain()
  }, [])


  const tryLogin = async() => {
    handleLoading(true)
    const success = await login(username, password)
    if (success) {
      handleAuth()
    } else {
      enqueueSnackbar("Couldn't login")
      handleLoading(false)
    }
  }
  
  return (
    <Wrapper>
      { loading ? (
        <div className="flex items-center">
          <CircularProgress color="primary" aria-label="Loading..."/>
          <p className="pl-8">
            Loading...
          </p>
        </div>
      ) : (
        <div>
          
          <Card className="inline-block">
            <form className="p-4" onSubmit={(e) => {
              e.preventDefault()
              tryLogin()
            }}>
              <p className="font-bold">
                DIVVIUP CLIENT
              </p>
              <div className="pt-4">
                <Input 
                  type="text" 
                  isRequired={true}
                  label="Username" 
                  onChange={(e) => { handleUsername(e.target.value) }}
                  value={username}
                  placeholder="Enter your username" 
                />
              </div>
              <div className="pt-4">
                <Input 
                  type="password" 
                  label="Password" 
                  onChange={(e) => { handlePassword(e.target.value) }}
                  value={password}
                  isRequired={true}
                  placeholder="Enter your password" 
                />
              </div>
              <div className="pt-4 flex justify-end">
              <Button 
                type="submit"
                color="primary"                
                >Login</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div``