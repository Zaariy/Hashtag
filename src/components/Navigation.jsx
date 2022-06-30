import React , {useState} from 'react' ;
import '../css/navigation.css' ;
import {Link} from 'react-router-dom' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import {faBars , 
faMagnifyingGlass ,
faHouse ,
faBell ,
faUserGroup ,
faEnvelopeOpen , 
faNewspaper,
faUser , faSliders , faXmark
} from '@fortawesome/free-solid-svg-icons' ;

const logo = require('../images/logoBlack.png') ; 
const avatar = require('../images/avatar.jpg');

function Navigation() {
	const [menu , setmenu] = useState(false);
	const [menuRight , setmenuRight] = useState(false) ;

	// function DoEvent() {
	// 	const elemnt = document.querySelector('')
	// }

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
						<form action='#' method='POST' >
							<input type='text' placeholder='Search here...' name='search' />
							< FontAwesomeIcon className='icon-search' icon={faMagnifyingGlass} />
						</form>
					</div>
					<div className='nav-profile'>
						<div className='nav-right'>
							<Link to={'#'} ><FontAwesomeIcon icon={faHouse} /></Link>
							<Link to={'#'} ><FontAwesomeIcon icon={faBell} /></Link>
							<Link to={'#'} ><FontAwesomeIcon icon={faUserGroup} /></Link>
							<Link to={'#'} ><FontAwesomeIcon icon={faEnvelopeOpen} /></Link>
						</div>
						<div className='profile'>
							<img  src={avatar} alt='avatar' />
							<p>Mohamed</p>
						</div>
						<FontAwesomeIcon icon={faSliders} onClick={(e) => setmenuRight(!menuRight)} className='icon-sliders-right' />
					</div>
				</div>	
			</div>
			<div className='menu-side-body' style={{'display' : menu ? "flex" : 'none'}} >
				<ul className='ul-socail'>
					<li>
						Socail
						<ul>
							<li><FontAwesomeIcon icon={faNewspaper} /><Link to={'#'}  >Newsfeed</Link></li>
							<li><FontAwesomeIcon icon={faUser} /><Link to={'#'}  >Profile</Link></li>
							<li><FontAwesomeIcon icon={faBell} /><Link to={'#'}  >Notification</Link></li>
						</ul>
					</li>
				</ul>
			</div>
			<div className='nav-right-mb' style={{'visibility' : menuRight ? 'visible' : 'hidden'}}>
				<div className='head'>
					<h1>General Setting</h1>
					<FontAwesomeIcon icon={faXmark} onClick={() => setmenuRight(!menuRight)} className='icon-xmark-close' />	
				</div>
				<div className='user-nav' >
					<Link to={'#'} > <FontAwesomeIcon icon={faHouse} /> Home</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faBell} />Notification</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faUserGroup} />Friend Request</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faEnvelopeOpen} />Message</Link>
					<Link to={'#'} ><FontAwesomeIcon icon={faUser} />Profile</Link>
				</div>
				
			</div>
		</nav>
	)
}

export default Navigation ;