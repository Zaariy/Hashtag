import React, { useState } from 'react';
import Fetch_api from '../../fetch_api_data.js';
import './navigation.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import {
	faBars,
	faMagnifyingGlass,
	faHouse,
	faBell,
	faUserPen,
	faUserGroup,
	faEnvelopeOpen,
	faNewspaper,
	faUser, faUserGear, faSliders, faXmark, faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

const logo = require('../../images/logoBlack.png');
function Navigation() {
	const [menu, setmenu] = useState(false);
	const [menuRight, setmenuRight] = useState(false);
	const [clickimgProfile, setClickImgProfile] = useState(false)
	const [datasearch, setDataSearch] = useState()
	const { data_fetch } = Fetch_api(`/route/information_user/${sessionStorage.getItem("session")}`)


	function logout() {
		sessionStorage.clear()
		axios.post('/route/logout').then((data) => data.json())
	}

	return (
		<nav>
			<div className='container'>
				<div className='content'>
					<div className='logo-menu'>
						<div className='logo'>
							<img src={logo} alt='logo' />
							<span>Hashtag</span>
						</div>
						<div className='side-menu' onClick={() => setmenu(!menu)}>
							<FontAwesomeIcon className='icon-brs' icon={faBars} />
						</div>
					</div>
					<div className='search'>
						<form action='#' method='get' onSubmit={(e) => e.preventDefault()} >
							<input type='text' onChange={(e) => setDataSearch(e.target.value)} placeholder='Search here...' name='search' />
							<Link to={'/search'} state={{ "name": datasearch }}>< FontAwesomeIcon className='icon-search' icon={faMagnifyingGlass} /></Link>
						</form>
					</div>
					<div className='nav-profile'>
						<div className='nav-right'>
							<Link to={'/home'} ><FontAwesomeIcon icon={faHouse} /></Link>
							<Link to={'#'} ><FontAwesomeIcon icon={faBell} /></Link>
							<Link to={'#'} ><FontAwesomeIcon icon={faUserGroup} /></Link>
							<Link to={'#'} ><FontAwesomeIcon icon={faEnvelopeOpen} /></Link>
						</div>
						<div className='profile'>
							<img src={data_fetch?.poster_img} alt='avatar' onClick={() => setClickImgProfile(!clickimgProfile)} />
							<p>{data_fetch?.full_Name}</p>
							<div className='profile-click-menu' style={{ "visibility": clickimgProfile ? 'visible' : 'hidden' }}>
								<span> Hello {data_fetch?.full_Name} </span>
								<ul>
									<li><FontAwesomeIcon icon={faUser} /><Link to={'/profile'} >My Profile </Link> </li>
									<li><FontAwesomeIcon icon={faUserPen} /><Link to={'/edit-profile'} >Edit Profile</Link></li>
									<li><FontAwesomeIcon icon={faUserGear} /><Link to={'/profile'} >Account Setting</Link></li>
									<li><FontAwesomeIcon icon={faArrowRightFromBracket} /><Link to={'/singin'} onClick={() => logout()} >Logout</Link></li>
								</ul>
							</div>
						</div>
						<FontAwesomeIcon icon={faSliders} onClick={(e) => setmenuRight(!menuRight)} className='icon-sliders-right' />
					</div>
				</div>
			</div>
			<div className='menu-side-body' style={{ 'display': menu ? "flex" : 'none' }} >
				<ul className='ul-socail'>
					<li>
						Socail
						<ul>
							<li><FontAwesomeIcon icon={faNewspaper} /><Link to={'/home'}  >Newsfeed</Link></li>
							<li><FontAwesomeIcon icon={faUser} /><Link to={'/profile'}  >Profile</Link></li>
							<li><FontAwesomeIcon icon={faBell} /><Link to={'#'}  >Notification</Link></li>
							<li><FontAwesomeIcon icon={faUserPen} /><Link to={'/edit-profile'}  >Edit Profile</Link></li>
						</ul>
					</li>
				</ul>
			</div>
			<div className='nav-right-mb' style={{ 'visibility': menuRight ? 'visible' : 'hidden' }}>
				<div className='head'>
					<h1>General Setting</h1>
					<FontAwesomeIcon icon={faXmark} onClick={() => setmenuRight(!menuRight)} className='icon-xmark-close' />
				</div>
				<div className='user-nav' >
					<Link to={'/home'} > <FontAwesomeIcon icon={faHouse} /> Home</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faBell} />Notification</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faUserGroup} />Friend Request</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faEnvelopeOpen} />Message</Link>
					<Link to={'/profile'} ><FontAwesomeIcon icon={faUser} />profile</Link>
					<a href='/singin' onClick={() => {
						logout()

					}} ><FontAwesomeIcon icon={faArrowRightFromBracket} />logout</a>
				</div>

			</div>
		</nav>
	)
}

export default Navigation;