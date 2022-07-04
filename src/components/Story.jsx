import React from 'react' ;
import '../css/story.css'

function Story () {
	const stories =  [1,1,1,1]

	return (
		<div className='stories' >
				<div className='header'>
					<span>Stories</span>
				</div>
				<div className='content'> 
					<div className='add-stories'>
						<span>+</span>

						<div className='text'>
							<span>Create Your Story</span>
							<span> Time to story </span >
						</div>
					</div>
					{
						stories.map((ele , index) => {
							return (

							<div className='cart-story' key={index}>
							<img src={`https://picsum.photos/70/70?random=${index + 1}`} alt='logo' />
							<div className='text'>
								<span>John</span>
								<span> 2 hours Ago </span >
							</div>
						</div>
								)
						})
					}

				</div>
				<button>See All</button>
		</div>
		)
}
export default Story ;