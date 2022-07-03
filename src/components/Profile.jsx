import React , {useState} from 'react' ;
import '../css/profile.css';
import Navigation from './Navigation.jsx' ;
import Postes from './Postes.jsx' ;
import CreatePost from './Createpost.jsx' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import {faPencil , faGear , faMessage , faThumbsUp} from '@fortawesome/free-solid-svg-icons'; 

// test Photos 
const imgOne =  require('../images/person.jpg');
const imgProfile =  require("../images/avatar.jpg") ;
const imgTow =  require('../images/sea.jpg') ;



function HeaderProfile() {
	const [componentRunder , setComponent] = useState('Timeline') ;
	function slidingColors (e) {
		const element =  document.querySelectorAll('.profile-page .nav ul li') ;
		element.forEach(ele => {
			
				if (ele ==  e.target) {
					ele.classList.add('active-item-nav-profile')
					setComponent(e.target.textContent)
				}else {
					ele.classList.remove('active-item-nav-profile')
				}
			
		})
	}

	function whichComponentRunder() {
		// this function it will runder component
		// automaticly when user click on slider
		// prfile 
		if (componentRunder === 'Timeline')  {
			return <> <CreatePost /><Postes /> </>
		}else if (componentRunder === 'Photos') {
			return <Photos />
		}else if (componentRunder === 'About') {
			return <About />
		} else if (componentRunder === 'Friend') {
			return <Friends />
		}
	}
	return (
		<>
			<header>
			<div className='containerMainpage' >
				<div className='content' >
					<div className='images' style={{'backgroundImage' : `url(${imgProfile})`}}>
						<img src={imgProfile} alt='logoprofile' />
						<h1>Sara</h1>
						<div className="edit" >
							<button><FontAwesomeIcon icon={faPencil} /></button>
							<button><FontAwesomeIcon icon={faGear} /></button>
						</div>
					</div>
				<div className='followers-info' >
						<ul>
							<li>Psots <span> 100</span></li>
							<li>Followers<span> 200</span></li>
							<li>Following<span> 300</span></li>
						</ul>
				</div>
				<div className='nav'>
					<ul>
						<li onClick={(e) => slidingColors(e)} className='active-item-nav-profile' >Timeline</li>
						<li onClick={(e) => slidingColors(e)}>About</li>
						<li onClick={(e) => slidingColors(e)}>Photos</li>
						<li onClick={(e) => slidingColors(e)}>Friend</li>
					</ul>
				</div>
			</div>
			</div>	
			</header >
				
			{
				
				whichComponentRunder()
			}
		</>
		)
}

function Photos () {
	//for testing
	const images = [imgOne , imgProfile , imgTow] ;
	return (
		<div className='containerMainpage' >
		<div className='photos-profile' > 
			<h2>Photos</h2>
			<div className='poster-photos-profile'>
				{

					images.map((img , index) => {
						return (
							<div className='cart-image' key={index} >
								<img src={img} alt='img' />
								<div className='info'>
									<ul>
										<li onClick={(e) => e.target.style.color !== 'red' ? e.target.style.color =  'red' : e.target.style.color =  'white'} > <span>10</span> <FontAwesomeIcon  icon={faThumbsUp} /></li>
										<li><span>10</span><FontAwesomeIcon  icon={faMessage} /></li>
									</ul>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
		</div>
		)
}

function About () {
	return (
		<div className='containerMainpage' >
		<div className='about-user-profile' >
			<div className='text' >
				<h2>Personal Info</h2>
				<ul>
					<li>
						<span>About Me</span>
						<span>
							Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56
						</span>
					</li>
					
					<li>
						<span>About Me</span>
						<span>
							Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56
						</span>
					</li>
					<li>
						<span>Email</span>
						<span>
							user@gmail.com
						</span>
					</li>
					<li>
						<span>Mobile</span>
						<span>
							0645454545
						</span>
					</li>
					<li>
						<span>Birth Date: </span>
						<span>
							Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56
						</span>
					</li>
					<li>
						<span>Gender</span>
						<span>
							Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56
						</span>
					</li>
					<li>
						<span>Gender</span>
						<span>
							Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56
						</span>
					</li>
				</ul>
			</div>
		</div>
		</div>
		)
}

function Friends () {
	//for testing 
	const a = [1,1,1,1,1,1,1,1]
	return (
		<div className='containerMainpage' >
			<div className='friends-user-profile'> 
					<h2>Friends</h2>
					<div className='content' >
					{
						a.map((ele , index) => {
							return (
								<div className='cart-friens' key={index} >
									
										<div className='text'>
											<img src={imgOne} alt='logo' />
											<div className='info' > 
												<span>Mohamed</span>
												<span>6</span>
											</div> 
											
										</div>
										<button>Friends</button>
									</div>
								)
						})
					}
					</div>
			</div>
		</div>
		)
}

function  Profile() {

	return (
		<div className='all-content-profile'>
		<Navigation />
		<div className='profile-page' >
			<HeaderProfile />
		</div>
		</div>
		)
}


export default Profile ;