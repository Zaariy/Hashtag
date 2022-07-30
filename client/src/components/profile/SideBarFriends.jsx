import React from 'react' ;


// for test
const images = [1,2,3]
function SideFriends () {
	return (
		<div className='side-photos'> 
			<div className='content'>
				<div className='head-photos'>
					<span> Friends </span>
					<span> Add Friends </span >
				</div>
				<div className='cart-side-photo' >
					{
						images.map((img , index) => {
							return (
								<div className='cart-friend' key={index}>

								<img src={`https://picsum.photos/200/300?random=${index}`} alt="logo" /> 
								<span className='name'>Hamda</span>
								</div>
								)
						})
					}
				</div>
				
			</div>
		</div>
	)
} 

export default SideFriends ;