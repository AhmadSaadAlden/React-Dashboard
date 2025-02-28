import './DeleteProductPage.css'
import DeletProductForm from './DeletProductForm'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNotification } from '../ProductContext/NotificationContext'

const DeleteProductPage = () => {
  const {id} = useParams()
  const navigate =useNavigate()
  const {toast} = useNotification()

  const handleConfirmDelete = async () => {
    try{
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found in localStorage');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
      const response = await axios.delete(`https://vica.website/api/items/${id}` , config)
      if (response.status === 201) {
        navigate('/dashboard')
        toast.success("successfuly delet product")
      }
    }
    catch (error) {
      console.error('Error deleting product:', error);
    }
}

const handleCancelDelete = () => {
  navigate('/dashboard')
}

  return (
    <>
        <div className="delete-product-page">
            <DeletProductForm 
              title="Are You Sure You Want To Delete The Product?"
              btnAccept="Yes, Delete"
              btnDecline="Cancel"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
        </div>
    </>
  )
}

export default DeleteProductPage