import React ,  {useState , useEffect} from 'react' ;

import '../css/singup.css' ;
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome' ;
import {faTwitter , faFacebook	, faInstagram} from '@fortawesome/free-brands-svg-icons' ;
import {Link} from 'react-router-dom' ;
import axios from 'axios' ;
// import  { Link } from 'react-router-dom' ;


const img = require('../images/baner.png') ;




function Login(props) {
	const [data , setData] = useState({status : true})
	const [email , setEmail] = useState('')
	const [password , setPassword] = useState('')
	const [dataIsReady , setDataIsReady ] = useState(false) ;
	


	useEffect(() => {
		if (dataIsReady && chickInputs()) {
			chickLogin();

		}
	
		return  () => {
			setDataIsReady(false)
		}
	})

	function chickInputs () {
		if (password.length !== 0 && email.length !== 0  ) {
			return true
		}else {
			return false
		}
	}
	function chickLogin(){
		
			axios.post('/route/singin' ,   JSON.stringify({"email" : email , password : password }))
			.then((res) => res.data)
			.then((res) => {
			
			setData({"status" : res.status})
			console.log(res.status)
			if (res.status) {
				window.location.pathname = '/home';
				
			}else {
				setDataIsReady(false)
			}		
			} )
	}


	function handlEvent (event) {
		event.preventDefault();
		setDataIsReady(true)
	}
	
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
				<form action='/home' onSubmit={(e) => handlEvent(e)}   method='POST'>
					<label>
						Email address
					</label>
					<input type='email' name='email'  onChange={(e) => setEmail(e.target.value) } placeholder='Email address' />
					<span className='danger'>{ data?.status ? "" : 'email or password is not correct'}</span>
					<label>Password </label>
					<input type='password' name='password'  onChange={(e) => setPassword(e.target.value)} placeholder='Passwrod' />
					<div className='ruls'>

						<input type='checkbox' name='ruls' />
						<p>Remember Me</p>

						<input type='submit'   value='Sing In' />
					</div>
					<div className='social'>

						<p>
							Don't Have an account ? < Link to={'/singup'}>Sing Up</Link>
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