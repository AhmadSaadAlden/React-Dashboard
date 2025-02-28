import './DeletProductForm.css';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const DeletProductForm = ({ title, btnAccept, btnDecline, onConfirm, onCancel }) => {

  return (
    <>
      <div className="delete-confirmation-overlay">
        <div className="delete-confirmation-box">
          <h3>{title}</h3>
          <div className="actions">
            <button className="confirm-btn" onClick={onConfirm}>
              {btnAccept}
            </button>
            <button className="cancel-btn" onClick={onCancel}>
              {btnDecline}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeletProductForm;