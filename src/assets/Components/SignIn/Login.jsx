import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './Login.css'
import AuthButtons from "../AuthBuutons/AuthButtons"
import { useNotification } from "../AllProduct/ProductContext/NotificationContext"

const Login = ({info, btn}) => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const Navigate = useNavigate()
    const {toast} = useNotification()

    const setData = (event) => {
        event.preventDefault()
        const data = {
            email , password
        }

        fetch('https://vica.website/api/login' , {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(res=>res.text())
        .then(resText=> {
            try{
                const res = JSON.parse(resText)
                console.log(res)
                const token = res.token
                if (token) {
                    localStorage.setItem("token", `Bearer ${token}`);
                    Navigate("/dashboard");
                    toast.success(`Welcom back ${userName + lastName}`)
                } else {
                    console.error("Token not found in the response");
                }
            }
            catch{
                console.error("Error parsing JSON:", err);
            }
        })
        .catch(err=>console.log("Error in fetch:", err))
    }

  return (
    <div className="signinpages body">
    {info?.map((item , index) =>(
        <div className="signin" key={index}>
            <div className="info">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
            </div>
            <div className='form'>
                <form onSubmit={setData}>
                    <div className="form-info">
                        <div className="input-group">
                            <div>
                                <label htmlFor="email">{item.labelemail}</label>
                            </div>
                                <input type="email" name="email" id="email" placeholder = {item.placeholderEmail} required onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <div>
                                <label htmlFor="password">{item.labelpassword}</label>
                            </div>
                                <input type="password" name="password" id="password"  placeholder = {item.placeholderPassword} required onChange={event => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="register-group">
                        <AuthButtons btn={btn} />
                    </div>
                </form>
            </div>
            <div className="register-page">
                        <div className="span">
                            <span>
                                {item.account} 
                            </span>
                        </div>
                        <div>
                            <span>
                                <Link to={"/SignUp"} className='signup'>{item.register}</Link>
                            </span>
                        </div>
            </div>
        </div>
    ))}
    </div>
  )
}

export default Login