import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddProductForm from '../AddProductForm/AddProductForm';
import { ProductContext } from '../ProductContext/ProductContext';

const EditProductForm = () => {
  const { id } = useParams();
  const { setMode } = useContext(ProductContext);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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

        const response = await axios.get(`https://vica.website/api/items/${id}`, config);
        if (response.data) {
          setCurrentProduct(response.data)
          setMode('edit')
          console.log('Mode set to edit')
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProduct();
  }, [id, setMode]);

  return (
    <>
      <AddProductForm  currentProduct={currentProduct} />
    </>
  );
};

export default EditProductForm;