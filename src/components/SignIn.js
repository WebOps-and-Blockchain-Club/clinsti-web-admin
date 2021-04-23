import { useContext, useState } from "react";
import AuthContext from './authContext';
import axios from 'axios';

const SignIn = () => {
  const {getLoggedIn} = useContext(AuthContext);
  const [input,setInput] = useState({
    email:'abc@xyz.com',
    password:'test1234'
  })
  const [error,setError] = useState('')

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  const signin = async(e) =>{
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/admin',input);
    if(!response.data){
      setError('invalid')
      setInput({
        email:'abc@xyz.com',
        password:'test1234'
      })
      ;
    }else{
      await getLoggedIn();
    }
  }

  return (
    <form className="sign-in" onSubmit={signin} style={{display:"flex",flexDirection:"column"}}>
      <p style={{color:"red"}}>{error}</p>
      <input onChange={onChange} value={input.email} type="text" placeholder="email" name="email"/>
      <input onChange={onChange} value={input.password} type="text" placeholder="password" name="password"/>
      <button typr ="submit" onClick={signin}>SignIN</button>
    </form>
   );
}
 
export default SignIn;