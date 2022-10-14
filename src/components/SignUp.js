import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'

const SignUp = ({ changeAuthMode }) => {
	const navigate = useNavigate();

	const { userState, singUp } = React.useContext(AppContext)

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	const handlerClickRegister = (email, password) => {
		singUp(email, password)
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
		<div className="Auth-form-container">
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Registro</h3>
					<div className="text-center">
						¿Ya estás registrado?{" "}
						<span className="link-primary" role="button" onClick={changeAuthMode}>
							Iniciá sesión
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
						<button type="bottom" className="btn btn-primary" onClick={() => { handlerClickRegister(formData.email, formData.password) }}>
							Registrar
						</button>
						{userState.checking ? <h3>Verificando</h3> : null}
						{userState.error}
					</div>
					{/* <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
            </p> */}
				</div>
			</form>
		</div>
	)
}

export default SignUp
