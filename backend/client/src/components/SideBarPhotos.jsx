import React from 'react' ;

// for test
const images = [1,2]
function SidePhotos() {
	return (
		<div className='side-photos'> 
			<div className='content'>
				<div className='head-photos'>
					<span> Photos </span>
					<span> Add Photo </span >
				</div>
				<div className='cart-side-photo' >
					{
						images.map((img , index) => {
							return (
								<img src={`https://picsum.photos/200/300?random=${index}`} alt="logo" key={`photo${index}`}/> 
								)
						})
					}
				</div>
				
			</div>
		</div>
		)
} 

export default SidePhotos ;