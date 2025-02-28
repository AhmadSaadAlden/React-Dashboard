import './AddProductForm.css'
import PrimaryButtons from '../../PrimaryButtons/PrimaryButtons'
import { useContext, useEffect, useState,} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../ProductContext/ProductContext'
import { useNotification } from '../ProductContext/NotificationContext'

const AddProductForm = ({currentProduct}) => {
    const {add , mode , edit, setProductItem } = useContext(ProductContext)
    const data = mode === 'edit' ? edit : add
    const [productName , setProductName] = useState(currentProduct?.name || '')
    const [price , setprice] = useState(currentProduct?.price || '')
    const[image , setImage] = useState(null)
    const Naviagte = useNavigate()
    const {toast} = useNotification()

      const addProduct = async (e) => {
          e.preventDefault()
          if (!productName || !price || (!image && !currentProduct)) {
            console.error("All fields are required.")
            return;
          }

          const formData = new FormData()
          formData.append('name', productName)
          formData.append('price', price)
          if(image){
            formData.append('image', image)
          } else if( currentProduct?.image_url && mode === 'edit'){
            formData.append('image_url', currentProduct.image_url)
          }

          if(mode === 'edit'){
            formData.append("_method", "PUT")
          }
          
          try{
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('Token not found in localStorage')
                return;
            }
            const config = {
              headers : {
                Authorization: `Bearer ${token}`,
                Accept : "application/json",
                "Content-Type" : "multipart/form-data",
              }
            }
            const url = mode === 'edit' ? `https://vica.website/api/items/${currentProduct.id}` : 'https://vica.website/api/items'
            const method = mode === 'edit' ? 'put' : 'post'
            const response = await axios[method](url, formData, config)
            if (response.data) {
              console.log('Success response data:', response.data)
              Naviagte("/dashboard")
              toast.success("successfuly add product")
            }

          } catch (error) {
            console.error("Error sending data:", error)
            if (error.response) {
              console.error('Error response data:', error.response.data)
            }
          }
      }

      useEffect(() => {
        if(currentProduct){
          setProductName(currentProduct.name || '')
          setprice(currentProduct.price || '')
        }
      } , [currentProduct])

      const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(file); 
            const reader = new FileReader();
            reader.onload = (event) => {
              const imgElement = document.getElementById('uploaded-image');
              imgElement.src = event.target.result;
            };
            reader.readAsDataURL(file);
          }
      }

  return (
    <>
      {data?.map((item , index) => (
        <div key={index} className='item-add'>
          <div className='item'>
            <h1>{item.title}</h1>
            <form className='form' onSubmit={addProduct}>
              <div className='group-input'>
                <div>
                  <label htmlFor="text">{item.textlabel}</label>
                </div>
                <input type="text"  placeholder={item.textplacholder} onChange={e => setProductName(e.target.value)} value={productName} />
              </div>

              <div className='group-input'>
                <div>
                  <label htmlFor="number">{item.emaillabel}</label>
                </div>
                <input type="number" placeholder={item.emailplacholder} onChange={e => setprice(e.target.value)} value={price} />
              </div>
              
              <PrimaryButtons btn={item.btn} className="group-input btn" />
            </form>
          </div>

          <div className='images'>
            <input 
              type="file"  
              accept="image/*" 
              onChange={handleImageChange}
            />
            {currentProduct?.image_url || image ? (
              <img 
                id="uploaded-image" 
                src={currentProduct?.image_url || URL.createObjectURL(image)} 
                alt="uploaded" 
              />
            ) : (
              <div>
                <img src={item.uploadImage} alt={item.alt} /> 
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AddProductForm