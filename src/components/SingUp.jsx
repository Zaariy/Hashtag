import React from 'react' ;
import '../css/singup.css' ;
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome' ;
import {faTwitter , faFacebook	, faInstagram} from '@fortawesome/free-brands-svg-icons' ;
import {Link} from 'react-router-dom' ;
const img = require('../images/baner.png') ;

function SingUp () {

	return (

		<div className="sing-up">
			<div className='dark' ></div>
			<div className="images">
				<img src={img} alt="logo"  />
			</div>
			<div className='form-sing-up'  >
				<h1>Sing Up</h1>
				<p>
					Enter your Email Address and password to access 
					admin panle
				</p>
				<form action='#' method='POST'>
					<label>
						Your Full Name 
					</label>
					<input type='text' name='fname' placeholder='Your Full Name' />
					<label>
						Email address
					</label>
					<input type='email' name='email' placeholder='Email address' />
					<label>Password </label>
					<input type='password' name='passwrod' placeholder='Passwrod' />
					<div className='ruls'>

						<input type='checkbox' name='ruls' />
						<p>I accept <Link to={'#'} >Terms and Conditions</Link></p>

						<input type='submit' value='Sing Up' />
					</div>
					<div className='social'>

						<p>
							Already Have account? <Link to={'#'} >Log In</Link>
						</p>						
						<div className='social-media'>
							<Link to={'#'} ><FontAwesomeIcon className='icon-fb' icon={faFacebook} /></Link>
							<Link to={'#'} ><FontAwesomeIcon  className='icon-tw'icon={faTwitter} /></Link>
							<Link to={'#'} ><FontAwesomeIcon  className='icon-ins' icon={faInstagram} /></Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default  SingUp ;