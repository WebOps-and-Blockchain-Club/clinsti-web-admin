import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn(){
      await axios.get("http://localhost:3000/admin").then((res)=>{
        setLoggedIn(res.data)
      }).catch(()=>{
        setLoggedIn(false)
      });
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider}
