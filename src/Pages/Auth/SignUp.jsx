import './SignUp.css'
import Register from '../../assets/Components/register/Register.jsx'
const SignUp = () => {

    const infosignup = [
    {
        title : "Sign Up" , 
        description : "Create a account to continue" ,
        labelFirstName : "First Name",
        placeholderFirstName : "First Name",
        labelLasttName : "Last Name",
        placeholderLasttName : "Last Name",
        labelemail : "Email",
        placeholderEmail : "Enter your email" , 
        labelpassword : "Password",
        placeholderPassword : "********", 
        labelConfirmPassword : "Confirm",
        placeholderConfirmPassword : "********",
        account : "Already have an account?" ,
        register : "Sign In" , 
    }
]

    return (
        <div className='body'>
            <Register  infosignup={infosignup}  btn="Sign Up"  />
        </div>
    )
}

export default SignUp