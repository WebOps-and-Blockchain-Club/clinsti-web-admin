import { useContext, useState } from "react";
import AuthContext from '../server/authContext';

const SignIn = () => {
  const {signIn} = useContext(AuthContext);
  const [email,setEmail] = useState('abc@xyz.com')
  const [password,setPassword] = useState('test1234')
  const [error,setError] = useState('')

  const onChange = (e) => {
    if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
    if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  }

  const signin = async(e) =>{
    e.preventDefault();
    signIn({email:email,password:password}).catch(()=>{
      setError('invalid')
      setEmail('abc@xyz.com')
      setPassword('test1234')
    })
  }

  return (
    <form className="signin-form" onSubmit={signin}>
    {/* <form className="signin-form" onSubmit={signin} style={{display:"flex",flexDirection:"column"}}> */}  
      <input onChange={onChange} value={email} type="text" placeholder="email" name="email"/>
      <input onChange={onChange} value={password} type="text" placeholder="password" name="password"/>
      <p style={{color:"red"}}>{error}</p>
      <button typr ="submit" onClick={signin}>SignIn</button>
    </form>
   );
}
 
export default SignIn;