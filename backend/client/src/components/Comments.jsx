import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { axiosInc } from '../config.js';


/*
	This components render in every Post 
	on Postes {Postes.jsx} Page 
*/


function Comments({ event, user_public_data, user_spcific_data }) {
	// const [dataComment] =useState([data])
	const [inputdata, setInputData] = useState('');
	const [comments_data, setCommentsData] = useState();
	const [loading_comments, setLoadingComments] = useState(false);



	useEffect(() => {

		axiosInc.get(`/route/get_comments/${user_public_data.id_post}`).then(data => {

			setCommentsData(data.data)
			setLoadingComments(true);
		})
	}, [user_public_data.id_post])

	function hundleData() {
		if (inputdata.length === 0) {
			return
		}

		const dataSend = {
			name: user_spcific_data.full_Name,
			msg: inputdata,
			img: user_spcific_data.poster_img,
			id_user: user_spcific_data.id_user,
			id_post: user_public_data.id_post
		}

		axiosInc.post('/route/post_comments', JSON.stringify(dataSend)).then(d => console.log(d))

	}

	return (
		<div className='post-comments' style={{ 'display': event ? 'block' : 'none' }}>
			{
				loading_comments ? (
					comments_data?.comments?.map((data, index) => {
						return (
							<div className='cart-comments' key={index}>
								<Link to={'/profile'} state={{ "id": data?.id_user }}><img src={data.img} alt='img' /></Link>
								<div className='text'>
									<span>{data.name}</span>
									<span>{data.date.slice(0, 10)}</span>
									<p>
										{data.msg}
									</p>
								</div>
							</div>
						)
					})) : ''
			}
			<div className='send'>
				<input type='text' name='comment' onChange={(e) => setInputData(e.target.value)} placeholder='Write comment here...' />
				<FontAwesomeIcon onClick={() => hundleData()} icon={faPaperPlane} />
			</div>

		</div>
	)
}

export default Comments;