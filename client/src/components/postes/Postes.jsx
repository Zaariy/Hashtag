import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './postes.css';
import CreatePost from '../createPost/Createpost';
import Story from '../main/Story';
import Groups from '../main/Groups.jsx';
import Likes from './Likes.jsx';



function Postes(props) {


	const [clickState, setClickState] = useState(false);
	const [datauser, setdata] = useState(null)
	const receive_public_data = props?.user_public_data;
	useEffect(() => {

		axios.get(`/route/information_user/${sessionStorage.getItem("session")}`).then((data) => setdata(data.data))

	}, [])



	return (

		<div className='containerMainpage'>

			<div className='all-postes-content'>
				<div className='postes-news-all'>
					<CreatePost data={datauser} />
					<div className='postes-news'>
						{receive_public_data ? (
							receive_public_data?.map((ele_parent) => {
								return ele_parent?.postes?.map((data, index) => {

									return (
										<div className='cart' key={`${index}h`}>
											<div className='head' >
												<div className='info'>
													<Link to={'/profile'} state={{ "id": ele_parent?.id_user }}><img src={ele_parent?.poster_img} alt='logo' /></Link>
													<div className='text'>
														<span>{ele_parent?.full_Name}</span>
														<span>{data.date.slice(0, 10)}</span>
													</div>
												</div>
												<div className='select'>
													<span onClick={() => setClickState(!clickState)} >...</span>
													<ul style={{ 'visibility': clickState ? 'visible' : 'hidden' }} >
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
												{data?.body}
											</p>
											{
												data?.image !== '/images/public_img/undefined' ? <img src={data?.image} alt='myphoto' /> : ''
											}

											<Likes user_public_data={data} user_spcific_data={datauser} />
										</div>
									)
								})
							})
						) : ''

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