import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let history = useNavigate();

  
  const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    localStorage.setItem('userName',"Pratap")
    history('/products');
  }

  return (
    <div className="Auth-form-container">
      <div className='login_form_title'>        
        <h3 className="Auth-form-title">Signup</h3>
        <span className='login__baner__text'>We don't share your peronal details with anyone</span>
      </div>
      <form className="card-form" onSubmit={onSubmit}>
        <div className="input">
          <input type="text" className="input-field" required/>
          <label className="input-label">Last Name</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" required/>
          <label className="input-label">First Name</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" required/>
          <label className="input-label">Email</label>
        </div>
        <div className="input">
          <input type="password" className="input-field" required/>
          <label className="input-label">Password</label>
        </div>
        <div className="input">
          <input type="password" className="input-field" required/>
          <label className="input-label">Confirm Password</label>
        </div>
        <div className="action">
          <button className="action-button btn btn-danger"  type="submit" >Signup</button>
        </div>
		  </form>
    </div>
  )
}
