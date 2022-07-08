import React from 'react' ;

function About ({data}) {

	return (
		<div className='containerMainpage' >
		<div className='about-user-profile' >
			<div className='text' >
				<h2>Personal Info</h2>
				<ul>
					<li>
						<span>About Me</span>
						<span>
							{data?.about}
						</span>
					</li>
					
					<li>
						<span>Mobile</span>
						<span>
								{data?.mobile}
						</span>
					</li>
					<li>
						<span>Birth Date: </span>
						<span>
								{data?.address}
						</span>
					</li>
					<li>
						<span>Live :</span>
						<span>
							{data?.live_in}
						</span>
					</li>
					<li>
						<span>Gender</span>
						<span>
								{data?.gender}
						</span>
					</li>
					<li>
						<span>Website</span>
						<span>
								{data?.socil_link}
						</span>
					</li>
				</ul>
			</div>
		</div>
		</div>
		)
}

export default About ;