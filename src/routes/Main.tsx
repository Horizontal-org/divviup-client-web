import { FunctionComponent, Key, useCallback, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { MainScreen } from "../components/MainScreen";
import { LoginScreen } from "../components/LoginScreen";
// import {Task} from "@divviup/dap/dist/task";

interface Props {}


export const Main: FunctionComponent<Props> = () => {  
  const [auth, handleAuth] = useState(false)

  return (
    <Wrapper>
      { auth ? (
        <MainScreen />
      ) : (
        <div>
          <LoginScreen 
            handleAuth={() => {
              handleAuth(true)
            }}
          />
        </div>
      )}
     
    </Wrapper>
  )
}