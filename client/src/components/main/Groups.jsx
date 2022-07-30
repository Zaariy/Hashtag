import React from 'react';
import './groups.css';

const img = require('../../images/images.png');
function Groups() {

	return (
		<div className='groups' >
			<div className='header' >
				<span>Groups</span>
			</div>
			<div className='content'>
				<div className='cart-group' >

					<img src={img} alt='logo' />
					<div className='text' >
						<span>React js</span>
						<span> Memembers 300</span>

					</div>
				</div>
			</div>

			<button >See All</button>
		</div>
	)
}


export default Groups;