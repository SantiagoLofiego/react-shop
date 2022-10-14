import React, { useState } from 'react'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import '../styles/Login.css'

const Login = () => {
	let [authMode, setAuthMode] = useState("signin")

	const changeAuthMode = () => {
		setAuthMode(authMode === "signin" ? "signup" : "signin")
	}

	if (authMode === "signin") {
		return (
			<SignIn changeAuthMode={changeAuthMode} />
		)
	}

	return (
		<SignUp changeAuthMode={changeAuthMode} />
	)
}

export { Login };