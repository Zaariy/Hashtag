import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './postes.css';
import CreatePost from '../createPost/Createpost';
import Story from '../main/Story';
import Groups from '../main/Groups.jsx';
import { useSelector} from 'react-redux';
import InteractionField from './InteractionField';



function Postes(props) {
	let public_postes_data = useSelector(state => state.public_postes )
	const [clickState, setClickState] = useState(false);

	if (props.user_postes) {
		// check if data came from public postes data or from postes of user
		public_postes_data =  props.user_postes
	}
	const hundleShowOptions = (id) => {
		//  this function it is show us the option menu at the left top of the poste
		const listes = document.querySelector(`[uniqid="${id}"]`)
		listes.style.visibility = clickState ? 'visible' : 'hidden'
	}
	

	return (

		<div className='containerMainpage'>

			<div className='all-postes-content'>
				<div className='postes-news-all'>
					<CreatePost  />
					<div className='postes-news'>
						{
							public_postes_data.postes?.map((post, index) => {

								return (
									<div className='cart' key={`${index}h`}>
											<div className='head' >
												<div className='info'>
													<Link to={'/profile'} state={{ "id": post?.id_user_platform }}><img src={post?.poster_img} alt='logo' /></Link>
													<div className='text'>
														<span>{post?.full_Name}</span>
														<span>{post.date.slice(0, 10)}</span>
													</div>
												</div>
												<div className='select'>
													<span onClick={(e) => {
														hundleShowOptions(index)
														setClickState(!clickState)
													}} >...</span>
													<ul uniqid={index} >
														<li>
															Save this poste
															<span>seve this on your account</span>
														</li>
														<li>
															Notification
															<span>turn off notification this person</span>
														</li>
														<li>
															Report
															<span>report this person </span>
														</li>
													</ul>
												</div>
											</div>
											<p>
												{post?.body}
											</p>
											{
												post?.image !== undefined ? <img src={`/uploads/images/${post?.image}`} alt='myphoto' /> : ''
											}
										<InteractionField idComment={index } postdata={post}/>
									</div>
								)
							})
						}
					</div>
				</div>
				<div className='childs-props'>

					{
						props.Child_pass_data ? props.Child_pass_data.map((ele, index) => {
							return (
								<div key={index}>
									{ele}
								</div>
							)
						}) : (
							<>
								<Story />
								<Groups />
							</>
						)
					}
				</div>
			</div>
		</div>
	)
}


export default Postes;