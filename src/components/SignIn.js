import { Button, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { useMountAnimation } from "../hooks/useMountAnimation";

const SignIn = ({ changeAuthMode }) => {
  const navigate = useNavigate();
  const animated = useMountAnimation('anim-fade-start', 'anim-fade-end');
  const { userState, loginWithEmailAndPassword } = React.useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handlerClickLogin = (email, password) => {
    loginWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    if (userState.user.authenticated) {
      navigate('/')
    }
  }, [navigate, userState])

  const formDataInitial = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(formDataInitial);
  const handlerChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className={`Auth-form-container`}>
      <form className={`Auth-form ${animated}`} onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Inicio de Sesión</h3>
          <div className="text-center">
            ¿No estás registrado?{" "}
            <span className="link-primary" role="button" onClick={changeAuthMode}>
              Registrate
            </span>
          </div>
          <div className="form-group mt-3">
            <label>E-mail</label>
            <input type="email" name="email" className="form-control mt-1" placeholder="Ingresa tu E-mail" onChange={handlerChange} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control mt-1" placeholder="Ingresa la Password" onChange={handlerChange} />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button hidden={userState.checking ? true : false} type="bottom" className="btn btn-primary" onClick={() => { handlerClickLogin(formData.email, formData.password) }}>
              Iniciar
            </button>
            {userState.checking ?
              <Button variant="primary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Procesando
              </Button> 
              : null}
            {userState.error ? <span className='alert alert-danger'>{userState.error}</span> : ''}
          </div>
          {/* <p className="text-center mt-2">
							Forgot <a href="#">password?</a>
						</p> */}
        </div>
      </form>
    </div>
  )
}

export default SignIn
