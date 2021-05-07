import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    async function getLoggedIn(){
      await axios.get("http://localhost:3000/admin/complaints/1").then((res)=>{
        if(res.status === 200){
          setLoggedIn(true)
        }else if(res.status === 404){
          setLoggedIn(true)
        } else if (res.status === 404){
          console.log('Invalid')
          setLoggedIn(false)
        }else{
          setLoggedIn(false)
        }
      }).catch((e)=>{
        if(e.response){
          if(e.response.status === 404){
            setLoggedIn(true)
          } else if (e.response.status === 400){
            console.log('Invalid')
            setLoggedIn(false)
          }else{
            setLoggedIn(false)
          }
        }else{
          setLoggedIn(false)
        }
      });
    }

    async function signIn({email,password}){
      await axios.post('http://localhost:3000/admin',{
        email,password
      }).then((v)=>{
        setLoggedIn(true)
      }).catch((e)=>{
        setLoggedIn(false)
        throw e
      })
    }

    async function signOut(){
      await axios.delete('http://localhost:3000/admin').catch()
      setLoggedIn(false)
    }
    

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn,signIn,signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider}
