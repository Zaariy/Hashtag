import React, { useState , useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import Loading from '../loading/LoadingPage.jsx';
import './profile.css';
import Navigation from '../nav/Navigation.jsx';
import Postes from '../postes/Postes.jsx';
import Photos from './Photos.jsx';
import About from './AboutPersonProfile.jsx';
import Friends from './FriendsRequests.jsx';
import SideFriends from './SideBarFriends.jsx';
import SidePhotos from '../main/SideBarPhotos.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import axios from 'axios';

function Profile() {
	const receiveIdUsers = useLocation().state
	const [data , setData] = useState()
	const [loading, setLoading] = useState(false);
	const globaldatauser = useSelector(state => state.userData.data);
	useEffect(() => {
		if (receiveIdUsers?.id) {
			axios({
				url: "/api/userinfo",
				method: "POST",
				data: {
					id_user_platform: receiveIdUsers.id,
					token: localStorage.getItem("token")
				}
			}).then(resoponseData => {
				setData((prv) => {
					return prv =  resoponseData.data
				})
				setLoading(true)
			})
			
			
		} else {
			setData(globaldatauser)
			setLoading(true)
		}
		
	} ,[globaldatauser , receiveIdUsers?.id])
	return (
		
		<>
			{
				loading	 ? (<div className='all-content-profile'>
					<Navigation />
					<div className='profile-page' >
						<HeaderProfile userdata={data} />
					</div>
				</div>) : <Loading />

			}
		</>
	)
}



function HeaderProfile({userdata}) {
	const [componentRunder, setComponent] = useState('Timeline');

	const data = userdata // 

	function slidingColors(e) {
		const element = document.querySelectorAll('.profile-page .nav ul li');
		element.forEach(ele => {

			if (ele === e.target) {
				ele.classList.add('active-item-nav-profile')
				setComponent(e.target.textContent)
			} else {
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


		if (componentRunder === 'Timeline') {
			return <Postes user_postes={{ postes : userdata.postes }} Child_pass_data={[<SidePhotos />, <SideFriends />]} />
		} else if (componentRunder === 'Photos') {
			return <Photos data={data} />
		} else if (componentRunder === 'About') {
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
						<div className='images' style={{ 'backgroundImage': `url(${data?.background_img})` }}>
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



export default Profile;