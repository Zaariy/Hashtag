import React from 'react' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 

function Friends () {

	//for testing 
	const a = [1,1,1]
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

export default Friends ;