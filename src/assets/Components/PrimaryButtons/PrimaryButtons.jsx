import './PrimaryButtons.css'

const PrimaryButtons = ({btn , children}) => {
  return (
    <>
      <button className='primarybuttons'>
        {btn}
        {children}
      </button>  
    </>
  )
}

export default PrimaryButtons