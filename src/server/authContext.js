import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const baseLink = process.env.REACT_APP_API_URL ||  "http://localhost:3000"

    async function getLoggedIn(){
      await axios.get(`${baseLink}/admin/complaints/1`).then((res)=>{
        if(res.status === 200){
          setLoggedIn(true)
        }else if(res.status === 404){
          setLoggedIn(true)
        } else if (res.status === 404){
          setLoggedIn(false)
        }else{
          setLoggedIn(false)
        }
      }).catch((e)=>{
        if(e.response){
          if(e.response.status === 404){
            setLoggedIn(true)
          } else if (e.response.status === 400){
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
      await axios.post(`${baseLink}/admin`,{
        email,password
      }).then((v)=>{
        setLoggedIn(true)
      }).catch((e)=>{
        setLoggedIn(false)
        throw e
      })
    }

    async function signOut(){
      await axios.delete(`${baseLink}/admin`).catch()
      setLoggedIn(false)
    }
    

    useEffect(() => {
        getLoggedIn();
        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn,signIn,signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider}
