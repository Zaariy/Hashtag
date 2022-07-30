import React from 'react';



function Loading() {
	const logo = require('../../images/logoBlack.png')

	return (

		<div className="loading-page" >
			<img src={logo} alt="logo" />
		</div>
	)
}


export default Loading;