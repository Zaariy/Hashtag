import React from 'react' ;
import '../css/singup.css' ;
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome' ;
import {faTwitter , faFacebook	, faInstagram} from '@fortawesome/free-brands-svg-icons' ;
import {Link} from 'react-router-dom' ;



const img = require('../images/baner.png') ;


function Login() {

	return (
		<div className="sing-up">
			<div className='dark' ></div>
			<div className="images">
				<img src={img} alt="logo"  />
			</div>
			<div className='form-sing-up'  >
				<h1>Sing In</h1>
				<p>
					Enter your Email Address and password to access 
					admin panle
				</p>
				<form action='#' method='POST'>
					<label>
						Email address
					</label>
					<input type='email' name='email' placeholder='Email address' />
					<label>Password </label>
					<input type='password' name='passwrod' placeholder='Passwrod' />
					<div className='ruls'>

						<input type='checkbox' name='ruls' />
						<p>Remember Me</p>

						<input type='submit' value='Sing In' />
					</div>
					<div className='social'>

						<p>
							Don't Have an account ? < Link to={'#'}>Sing Up</Link>
						</p>						
						<div className='social-media'>
							< Link to={'#'}><FontAwesomeIcon className='icon-fb' icon={faFacebook} /></Link>
							< Link to={'#'}><FontAwesomeIcon  className='icon-tw'icon={faTwitter} /></Link>
							< Link to={'#'}><FontAwesomeIcon  className='icon-ins' icon={faInstagram} /></Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login ;