import React, { useState } from 'react';
import './singup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios';

const img = require('../../images/baner.png');

function BoxAlert(props) {


	const successImg = require('../../images/svg.png');

	return (
		<div className='box-alert'>
			<div className='content'>
				<h1>Account created seccessfly</h1>
				<span>Now you can Navigate</span>
				<img src={successImg} alt='img' />

				<Link to={'/singin'} >Log In</Link>


			</div>
		</div>
	)
}

function SingUp() {
	const { register , handleSubmit } = useForm();
	const [response, setResponse] = useState({
		msg: '' ,
		status : '' ,
		error : ''
	});
	const onSubmit = data => {
		axios({
			url: '/api/singup',
			method: 'POST' ,

			data: {
				fullName: data.fullName,
				password: data.password,
				email: data.email
			}
			
		}).then((res) => {
			setResponse(res.data)
		})
	}
	
	return (
		<div className="sing-up">
			<div className='dark' ></div>
			<div className="images">
				<img src={img} alt="logo" />
			</div>
			<div className='form-sing-up'  >
				<h1>Sing Up</h1>
				<p>
					Enter your Email Address and password to access
					admin panle
				</p>
				 <form onSubmit={handleSubmit(onSubmit)}>
					<label>
						Your Full Name
					</label>
					{
						response.error === 'fullName' ?  <span className='danger'>{response.msg}</span> : null	
					}
	
					<input type='text' {...register("fullName")} placeholder='Your Full Name' />
					<label>
						Email address
					</label>
										{
						response.error === 'email' ?  <span className='danger'>{response.msg}</span> : null	
					}
	
					<input type='email' {...register("email")} placeholder='Email address' />
					<label>Password </label>
										{
						response.error === 'password' ?  <span className='danger'>{response.msg}</span> : null	
					}
	
					<input type='password' {...register("password")} placeholder='Passwrod' />
					<div className='ruls'>

						<input type='checkbox' name='ruls' />
						<p>I accept <Link to={'#'} >Terms and Conditions</Link></p>

						<input type='submit' value='Sing Up' />
					</div>
					<div className='social'>

						<p>
							Already Have account? <Link to={'/singin'} >Log In</Link>
						</p>
						<div className='social-media'>
							<Link to={'#'} ><FontAwesomeIcon className='icon-fb' icon={faFacebook} /></Link>
							<Link to={'#'} ><FontAwesomeIcon className='icon-tw' icon={faTwitter} /></Link>
							<Link to={'#'} ><FontAwesomeIcon className='icon-ins' icon={faInstagram} /></Link>
						</div>
					</div>
				</form>

			</div>
			{response.status === 'ok' ? <BoxAlert /> : ''}
		</div>
	)
}

export default SingUp;