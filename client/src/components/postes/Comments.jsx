import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useSelector }  from "react-redux";
import {useForm} from "react-hook-form"
import { setRander } from '../main/sliceRerander';
import { useDispatch } from 'react-redux';

function Comments({ postdata  , eventOpneCloseComment}) {
	// const [dataComment] =useState([data])
	const datauser = useSelector(state => state.userData.data);
	const { register , handleSubmit} = useForm();
	const dispatch = useDispatch();



	function onSubmitComment(data) {


		const initDataForSend = {
			name: datauser.full_Name,
			msg: data.comment,
			poster_img: datauser.poster_img,
			id_user_platform: datauser.id_user_platform ,
		}

		axios({
			url : "/api/post_comment" ,
			method : "POST" ,
			data: {
				data_comment: initDataForSend,
				token: localStorage.getItem('token'),
				id_post: postdata.id_post ,

			}

		}).then(state => {
			if (state.data.status === 'ok') {
				dispatch(setRander())
			}
		})

	}

	return (
		<div className='post-comments' style={{ 'display': eventOpneCloseComment ? 'block' : 'none' }}>
			{	
					postdata.comments.map((comment, index) => {
						
						return (
							<div className='cart-comments' key={index}>
								<Link to={'/profile'} state={{ "id": comment.id_user_platform }}><img src={comment.img} alt='user pecture' /></Link>
								<div className='text'>
									<span>{comment.name}</span>
									<span>{comment.date.slice(0, 10)}</span>
									<p>
										{comment.msg}
									</p>
								</div>
							</div>
						)
					})
			}
			<div className='send'>
				<form onSubmit={handleSubmit(onSubmitComment)}>
					<input type='text' {...register('comment')} name='comment' placeholder='Write comment here...' />
					<button><FontAwesomeIcon  icon={faPaperPlane} /></button>
				</form>
			</div>

		</div>
	)
}

export default Comments;