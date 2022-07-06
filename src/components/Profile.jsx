import React , {useState , useEffect} from 'react' ;
import '../css/profile.css';
import Navigation from './Navigation.jsx' ;
import axios from 'axios' ;
import Postes from './Postes.jsx' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import {faPencil , 
	faGear , 
	faMessage , 
	faThumbsUp , 
	faCheck} from '@fortawesome/free-solid-svg-icons'; 

// test Photos 
const imgProfile =  require("../images/unknown.jpg") ;
//for testing
const images = [1,1,1,1,1,1 ,1,1,1,1,1,1] ;



function HeaderProfile(props) {
	const [componentRunder , setComponent] = useState('Timeline') ;
	const data = props.data ;
	console.log(data)

	
	function slidingColors (e) {
		const element =  document.querySelectorAll('.profile-page .nav ul li') ;
		element.forEach(ele => {
			
				if (ele ===  e.target) {
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
				return <Postes child={[<Sides /> , <SidesFriends />]} />  
			}else if (componentRunder === 'Photos') {
				return <Photos />
			}else if (componentRunder === 'About') {
				return <About data={data?.information} />
			} else if (componentRunder === 'Friend') {
				return <Friends />
			}

		
	}
	return (
		<>
			<header>
			<div className='containerMainpage' >
				<div className='content' >
					<div className='images' style={{'backgroundImage' : `url(${data?.background_img})`}}>
						<img src={data?.poster_img} alt='logoprofile' />
						<h1>{data?.full_Name}</h1>
						<div className="edit" >
							<button><FontAwesomeIcon icon={faPencil} /></button>
							<button><FontAwesomeIcon icon={faGear} /></button>
						</div>
					</div>
				<div className='followers-info' >
						<ul>
							<li>Psots <span>{data?.postes.length}</span></li>
							<li>Followers<span> {data?.followers}</span></li>
							<li>Following<span> {data?.following}</span></li>
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
	return (
		<div className='containerMainpage' >
		<div className='photos-profile' > 
			<h2>Photos</h2>
			<div className='poster-photos-profile'>
				{

					images.map((img , index) => {
						return (
							<div className='cart-image' key={index} >
								<img src={`https://picsum.photos/250/250?random=${index}`} alt='img' />
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

function About ({data}) {

	return (
		<div className='containerMainpage' >
		<div className='about-user-profile' >
			<div className='text' >
				<h2>Personal Info</h2>
				<ul>
					<li>
						<span>About Me</span>
						<span>
							{data?.about}
						</span>
					</li>
					
					<li>
						<span>Mobile</span>
						<span>
								{data?.mobile}
						</span>
					</li>
					<li>
						<span>Birth Date: </span>
						<span>
								{data?.address}
						</span>
					</li>
					<li>
						<span>Live :</span>
						<span>
							{data?.live_in}
						</span>
					</li>
					<li>
						<span>Gender</span>
						<span>
								{data?.gender}
						</span>
					</li>
					<li>
						<span>Website</span>
						<span>
								{data?.socil_link}
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
	const a = [1,1,1,1,1,1,1,1,1,1,1]
	return (
		<div className='containerMainpage' >
			<div className='friends-user-profile'> 
					<h2>Friends</h2>
					<div className='content' >
					{
						a.map((ele , index) => {
							return (
								<div className='cart-friend' key={index} >
									
										<div className='text'>
											<img src={`https://picsum.photos/150/150?random=${index}`} alt='logo' />
											<div className='info' > 
												<span>Mohamed</span>
												<span>15 friends </span>
											</div> 
											
										</div>
										<button><FontAwesomeIcon icon={faCheck} /> Friend</button>
									</div>
								)
						})
					}
					</div>
			</div>
		</div>
		)
}
function Sides() {
	return (
		<div className='side-photos'> 
			<div className='content'>
				<div className='head-photos'>
					<span> Photos </span>
					<span> Add Photo </span >
				</div>
				<div className='cart-side-photo' >
					{
						images.map((img , index) => {
							return (
								<img src={`https://picsum.photos/200/300?random=${index}`} alt="logo" key={`photo${index}`}/> 
								)
						})
					}
				</div>
				
			</div>
		</div>
		)
} 
function SidesFriends () {
	return (
		<div className='side-photos'> 
			<div className='content'>
				<div className='head-photos'>
					<span> Friends </span>
					<span> Add Friends </span >
				</div>
				<div className='cart-side-photo' >
					{
						images.map((img , index) => {
							return (
								<div className='cart-friend' key={index}>

								<img src={`https://picsum.photos/200/300?random=${index}`} alt="logo" /> 
								<span className='name'>Hamda</span>
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
	const [data , setdata] = useState()
	useEffect(() => {

			axios.get('/route/information_user').then((data) => {
				setdata(data.data)
			})

	} , [])
	return (
		<div className='all-content-profile'>
		<Navigation />
		<div className='profile-page' >
			<HeaderProfile data={data} />
		</div>
		</div>
		)
}


export default Profile ;