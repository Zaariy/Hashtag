import React, { useState } from 'react';
import './singin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const img = require('../../images/baner.png');

function Login() {
	const { register, handleSubmit } = useForm();
	const [response, setResponse] = useState({
		msg: '' ,
		status: '',	
	});

		
	const redirect = () => {
		window.location.pathname = '/home';
	}
	const onSubmit = data => {
		axios({
			url: "/api/login",
			method: "POST",
			data: {
				email: data.email,
				password: data.password
			}
		}).then((res) => {
			setResponse(res.data)
			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				redirect()
			}
		})
	}
		
	

	return (
		<div className="sing-up">
			<div className='dark' ></div>
			<div className="images">
				<img src={img} alt="logo" />
			</div>
			<div className='form-sing-up'  >
				<h1>Sing In</h1>
				<p>
					Enter your Email Address and password to access
					admin panle
				</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<label>
						Email address
					</label>
					<input type='email' name='email' {...register('email')}  placeholder='Email address' />
					{
						response.status === 'fail' ?<span className='danger'>{response.msg}</span> : null
					}
					<label>Password </label>
					<input type='password' name='password'{...register('password')}  placeholder='Passwrod' />
					<div className='ruls'>

						<input type='checkbox' name='ruls' />
						<p>Remember Me</p>

						<input type='submit' value='Sing In' />
					</div>
					<div className='social'>

						<p>
							Don't Have an account ? < Link to={'/singup'}>Sing Up</Link>
						</p>
						<div className='social-media'>
							< Link to={'#'}><FontAwesomeIcon className='icon-fb' icon={faFacebook} /></Link>
							< Link to={'#'}><FontAwesomeIcon className='icon-tw' icon={faTwitter} /></Link>
							< Link to={'#'}><FontAwesomeIcon className='icon-ins' icon={faInstagram} /></Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login;