import React from 'react' ;
import Navigation from './Navigation.jsx' ;
import CreatePost from './Createpost.jsx' ;
import Postes from './Postes.jsx' ;

function MainPage () {
	
	return (
		<div className='mainpage'>
			<Navigation />
			<CreatePost />
			<Postes />
		</div>
	)
}


export default MainPage ;