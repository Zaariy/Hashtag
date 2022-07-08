import React , { useEffict , useState} from 'react' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import {faThumbsUp, faMessage , faShare} from '@fortawesome/free-solid-svg-icons'; 



function Photos ({dataUser}) {

	return (
		<div className='containerMainpage' >
		<div className='photos-profile' > 
			<h2>Photos</h2>
			<div className='poster-photos-profile'>
				{
					dataUser?.postes.map((data , index) => {
						return (
							<div className='cart-image' key={index} >
								<img src={data.image} alt='img' />
								<div className='info'>
									<ul>
										<li onClick={(e) => e.target.style.color !== 'red' ? e.target.style.color =  'red' : e.target.style.color =  'white'} > <span>{data.comments.length}</span> <FontAwesomeIcon  icon={faThumbsUp} /></li>
										<li><span>{data.likes}</span><FontAwesomeIcon  icon={faMessage} /></li>
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

export default Photos ;