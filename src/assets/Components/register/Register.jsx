import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthButtons from '../AuthBuutons/AuthButtons'
import { useState } from 'react'
import { useNotification } from '../AllProduct/ProductContext/NotificationContext'

const Register = ({infosignup , btn}) => {

  const [first_name, setFirstName] = useState('')
  const [last_name , setLastName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [password_confirmation , setConfirmPassword] = useState('')
  const [profile_image , setProfileImage] = useState("/assets/images/uploadIcon.png")
  const [profile_image_file, setProfileImageFile] = useState(null) 
  const Navigate = useNavigate()
  const {toast} = useNotification()


  const setData = (event) =>{
    event.preventDefault()
    const data = new FormData()
    data.append('first_name' , first_name)
    data.append('last_name' , last_name)
    data.append('user_name' , first_name + last_name)
    data.append('email' , email)
    data.append('password' , password)
    data.append('password_confirmation' , password_confirmation)
    if (profile_image_file) {
      data.append('profile_image', profile_image_file)
    }
  

    fetch ('https://vica.website/api/register' , {
      method : 'POST',
      headers : {
        Accept : "application/json",
      },
      body : data
    })
    .then(res => res.text())
    .then(resText => {
      try {
        const res = JSON.parse(resText); 
        console.log(res);
        const token = res.data.token; 
        if (token) {
          localStorage.setItem("token", `Bearer ${token}`)
          Navigate("/dashboard")
          toast.success(`Welcom ${first_name + last_name}`)
        } else {
          console.error("Token not found in the response");
        }
      } catch (err) {
        console.error("Error parsing JSON:", err);
      }
    })
    .catch(err => console.log("Error in fetch:", err));
  }

   const handleImageChange = (event) => {
    const file = event.target.files[0]
    setProfileImageFile(file)
    const imageUrl = URL.createObjectURL(file)
    setProfileImage(imageUrl)
  }
  
  return (
    <>
    {infosignup.map((item, index) => (
      <div className="signup body" key={index}>
        <div className="info">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
        <div className='registeration-form'>
          <form onSubmit={setData}>
            <div className='group-one'>
              <div>
                <div>
                  <label htmlFor="text">{item.labelFirstName}</label>
                </div>
                  <input type="text" name="text" placeholder = {item.placeholderFirstName} required  onChange={event => setFirstName(event.target.value)} />
              </div>
              <div>
                <div>
                  <label htmlFor="text">{item.labelLasttName}</label>
                </div>
                  <input type="text" name="text" placeholder = {item.placeholderLasttName} required  onChange={event => setLastName(event.target.value)} />  
              </div>
            </div>

            <div className='group-two'>
              <div>
                <div>
                  <label htmlFor="email">{item.labelemail}</label>
                </div>
                  <input type="email" name="email" placeholder = {item.placeholderEmail} required className='input-email' onChange={event => setEmail(event.target.value)} />
              </div>
            </div>
              
            <div className='group-three'>
              <div>
                <div>
                  <label htmlFor="password">{item.labelpassword}</label>
                </div>
                  <input type="password" name="password"  placeholder = {item.placeholderPassword} required  onChange={event => setPassword(event.target.value)} />
              </div>
              <div>
                <div>
                  <label htmlFor="confirmPassword">{item.labelConfirmPassword}</label>
                </div>
                  <input type="password" name="password"  placeholder = {item.placeholderConfirmPassword} required  onChange={event => setConfirmPassword(event.target.value)} />
              </div>
            </div>

            <div className="upload-container">
              <label htmlFor="Profile Image">Profile Image</label>
              <div className="upload-box">
                <input type="file" accept="image/*" required onChange={handleImageChange} />
                <img src={profile_image} alt="uploadIcon" />
              </div>
            </div>

            <div className="register-group">
              <div>
                <AuthButtons btn={btn} />
              </div>
              <div className="account">
                <span>{item.account}
                  <Link to={"/"} className='signup'>{item.register}</Link>
                </span> 
              </div>
            </div>

          </form>
        </div>
      </div>
    ))}
    </>
  )
}

export default Register