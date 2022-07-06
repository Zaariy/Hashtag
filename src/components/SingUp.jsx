import React , {useState , useEffect} from 'react' ;
import '../css/singup.css' ;
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome' ;
import {faTwitter , faFacebook	, faInstagram} from '@fortawesome/free-brands-svg-icons' ;
import {Link} from 'react-router-dom' ;
import axios from 'axios' ;
const img = require('../images/baner.png') ;

function BoxAlert (props) {


	const successImg = require('../images/svg.png');

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

function SingUp () {

	const [fname , setFname] = useState('')
	const [email , setEmail] = useState('')
	const [password , setPassword] = useState('') ;
	const [dataIsReady , setDataIsReady] = useState(false) ;
	const [state , setState] = useState(false) ;
	useEffect(() => {
		submitData()
		
	})
	function chickInputs () {
		if (fname.length !== 0 && password.length !== 0 && email.length !== 0  ) {
			return true
		}else {
			return false
		}
	}
	function submitData(){
		if (dataIsReady && chickInputs()) {
			axios.post('/route/singup' ,  JSON.stringify({"email" : email , 'password' : password , 'full_Name' : fname}) )
			.then((res) => res.data)
			.then((res) => {
			
				setState(res.data)
				if (res.data) {
					console.log('redirect')
				}
				setDataIsReady(false)

		
			} )
		}

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
				<h1>Sing Up</h1>
				<p>
					Enter your Email Address and password to access 
					admin panle
				</p>
				<form action='/' method='POST' onSubmit={(e) => handlEvent(e)}>
					<label>
						Your Full Name 
					</label>
					<input type='text'  onChange={(e) => setFname(e.target.value)} placeholder='Your Full Name' />
					<label>
						Email address
					</label>
					<input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email address' />
					<label>Password </label>
					<input type='password' onChange={(e) => setPassword(e.target.value)}  placeholder='Passwrod' />
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
							<Link to={'#'} ><FontAwesomeIcon  className='icon-tw'icon={faTwitter} /></Link>
							<Link to={'#'} ><FontAwesomeIcon  className='icon-ins' icon={faInstagram} /></Link>
						</div>
					</div>
				</form>

			</div>
			{state ? <BoxAlert  /> : ''}
		</div>
	)
}

export  default SingUp  ;