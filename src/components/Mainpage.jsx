import React from 'react' ;
import Navigation from './Navigation.jsx' ;
import CreatePost from './Createpost.jsx' ;
function MainPage () {
	
	return (
		<div className='mainpage'>
			<Navigation />
			<div className='containerMainpage '>
				<CreatePost />
			</div>
		</div>
	)
}


export default MainPage ;