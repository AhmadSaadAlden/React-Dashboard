import { createContext, useState } from 'react';
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [mode, setMode] = useState('add')
  const [productItem, setProductItem] = useState([])
  const add = [
    {
      title: 'Add Product',
      textlabel: 'Product Name',
      textplacholder: 'Product Name',
      emaillabel: 'Price',
      emailplacholder: 'Price',
      btn: 'Save',
      uploadImage: '/assets/images/UploadIconAdd.png',
      altImage: 'upload',
    },
  ]

  const edit = [
    {
      title: 'Edit Product',
      textlabel: 'Product Name',
      textplacholder: 'Product Name',
      emaillabel: 'Price',
      emailplacholder: 'Price',
      btn: 'Update',
      uploadImage: '',
      altImage: '',
    },
  ]

  return (
    <ProductContext.Provider value={{ add, edit, mode, setMode, productItem, setProductItem }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductContext, ProductProvider }