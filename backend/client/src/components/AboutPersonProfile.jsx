import React from 'react' ;

function About({ user_spcific_data }) {
	const resceive_spcific_data =  user_spcific_data

	return (
		<div className='containerMainpage' >
		<div className='about-user-profile' >
			<div className='text' >
				<h2>Personal Info</h2>
				<ul>
					<li>
						<span>About Me</span>
						<span>
							{resceive_spcific_data?.about}
						</span>
					</li>
					
					<li>
						<span>Mobile</span>
						<span>
								{resceive_spcific_data?.mobile}
						</span>
					</li>
					<li>
						<span>Birth Date: </span>
						<span>
								{resceive_spcific_data?.address}
						</span>
					</li>
					<li>
						<span>Live :</span>
						<span>
							{resceive_spcific_data?.live_in}
						</span>
					</li>
					<li>
						<span>Gender</span>
						<span>
								{resceive_spcific_data?.gender}
						</span>
					</li>
					<li>
						<span>Website</span>
						<span>
								{resceive_spcific_data?.socil_link}
						</span>
					</li>
				</ul>
			</div>
		</div>
		</div>
		)
}

export default About ;