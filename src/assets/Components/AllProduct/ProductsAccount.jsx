import './ProductsAccount.css'

const ProductsAccount = ({accountMe}) => {
  return (
    <>
        <div className='header'>
            {accountMe.map((item , index) => (
                            <div key={index} className='nav-title'>
                                <h1>{item.title}</h1>
                                <div className='infoaccount'>
                                    <img src={item.profile} alt={item.profile} />
                                    <div className='info'>
                                        <h1>{item.name}</h1>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
            ))}
        </div>
    </>
  )
}

export default ProductsAccount