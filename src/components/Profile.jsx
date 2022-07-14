import React , {useState } from 'react' ;
import {useLocation} from 'react-router-dom' ;
import Fetch_api from '../fetch_api_data.js' ;
import Loading from './LoadingPage.jsx' ;
import '../css/profile.css';
import Navigation from './Navigation.jsx' ;
import axios from 'axios' ;
import Postes from './Postes.jsx' ;
import Photos from './Photos.jsx' ;
import About from  './AboutPersonProfile.jsx' ;
import Friends from './FriendsRequests.jsx' ;
import SideFriends from './SideBarFriends.jsx';
import SidePhotos from './SideBarPhotos.jsx' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import {faPencil , 
	faGear , 
	faMessage , 
	faThumbsUp , 
	faCheck
} from '@fortawesome/free-solid-svg-icons'; 


function  Profile(props) {
	const useLoc = useLocation()
	const id =  useLoc.state?.id
	const {data_fetch , loading} =  Fetch_api(`/route/information_user/${ id ? id : sessionStorage.getItem("session")}`)
	return (
		<>
			{ 
				loading ? ( <div className='all-content-profile'>
							<Navigation />
							<div className='profile-page' >
								<HeaderProfile user_public_data={data_fetch} />
							</div>
						</div>) : <Loading />

			}
		</>
		)
}



const images = [1,1,1] ;
function HeaderProfile(props) {
	const [componentRunder , setComponent] = useState('Timeline') ;
	const receive_public_data = props.user_public_data ;
	const data = receive_public_data
	
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
		/*
			this function it will runder component
			automaticly when user click on slider
		 	prfile 
		*/
		

			if (componentRunder === 'Timeline')  {
				return <Postes user_public_data={[receive_public_data]}  child={[<SidePhotos /> , <SideFriends />]} />  
			}else if (componentRunder === 'Photos') {
				return <Photos dataUser={data} />
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
							<li>Psots <span>{data?.postes?.length}</span></li>
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



export default Profile ;