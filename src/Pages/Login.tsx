import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  let history = useNavigate();

  const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    localStorage.setItem('userName',"Pratap")
    history('/products');
  }

  return (    
    <div className="Auth-form-container">
      <div className='login_form_title'>        
        <h3 className="Auth-form-title">Login</h3>
        <span className='login__baner__text'>Get acces to your Orders, Wishlist and Recommendations</span>
      </div>
      <form className="card-form" onSubmit={onSubmit}>
        <div className="input">
          <input type="text" className="input-field" required/>
          <label className="input-label">Email</label>
        </div>
        <div className="input">
          <input type="password" className="input-field" required/>
          <label className="input-label">Password</label>
        </div>
        <div className="action">
          <button className="action-button btn btn-danger" type="submit" >Login</button>
        </div>
		  </form>
    </div>
  )
}

export default Login