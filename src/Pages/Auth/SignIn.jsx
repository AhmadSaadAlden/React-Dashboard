import './SignIn.css'
import Login from '../../assets/Components/SignIn/Login'
import AuthButtons from '../../assets/Components/AuthBuutons/AuthButtons'

const SignIn = () => {

  const info = [
    {
      title : "Sign in" , 
      description : "Please enter your email and password to continue" ,
      labelemail : "Email",
      placeholderEmail : "Enter your email" , 
      labelpassword : "Password",
      placeholderPassword : "********", 
      account : "Don’t have an account?" ,
      register : "Sign Up" , 
    }
  ]

  return (
    <>
      <Login  info = {info}  btn = "Sign In">
        <AuthButtons />
      </Login>
    </>
  )
}

export default SignIn