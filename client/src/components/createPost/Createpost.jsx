import React, { useState , useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './createpost.css';
import { decodeJWTtoken} from '../../utils/helperFunctions';
import { useSelector } from 'react-redux';
import FormData from 'form-data';
import axios from 'axios';
import { setRander } from '../main/sliceRerander';  
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'



function CreatePost() {

	const [state, setState] = useState(false);
	const [image, setImage] = useState(false);
	const [selectedImg, setSelectedImg] = useState();
	const data = useSelector(state => state.userData.data)
	const dispatch = useDispatch();
	const {register  , handleSubmit } = useForm();

	
	useEffect(() => {
		// if user close post component we'll clear all data from inputs failds
		if (state === false) {
			setSelectedImg(null)
			setImage(false)		
		}

	} , [state])

	function selectData(data) {
		
		
		
		const formdata = new FormData()
		formdata.append('img', data.image[0])
		formdata.append('artical_post', data.story)
		formdata.append('id_user_platform' , decodeJWTtoken(localStorage.getItem('token')).id_user_platform)
		formdata.append('token', localStorage.getItem('token'));
		axios({
			url: `/uploads/post`,
			method: `POST`,
			headers: {
				"Content-Type": `mulitpart/form-data`
			},
	
			data: formdata,
	
		}).then((data) => {
	
			if (data.data.status === 'ok') {
				setState(false); 
				dispatch(setRander())
				
			} 
		})
	}
	
	function PopWindowPostStory() {
		return (
			<div className='pop-window'>
				<div className='content' >
					<div className='head-post'>
						<h2>Create Post</h2>
						<FontAwesomeIcon icon={faXmark} onClick={() => setState(!state)} />
					</div>
					<div className='info'>
						<img src={data?.poster_img} alt='logo' />
						<span>{data?.full_Name}</span>
					</div>
					<form onSubmit={handleSubmit(selectData)} encType='multipart/form-data' method='POST' >
						<input type='text' name='story' {...register('story') } placeholder='Write something here...' />
						{
							image ? <div className='upload-image' ><img  src={selectedImg} alt='user' /></div> : ''
						}
						<label htmlFor='fileimg' >&#127924; Photo</label>
						<p><input type='file' {...register('image', {
							onChange: (event) => {
							setSelectedImg(URL.createObjectURL(event.target.files[0]))
							setImage(true)
						}})} id='fileimg' name='image' /></p>
						<button >Send</button>
					</form >
				</div>
			</div>

		)
	}

	return (
		<div>
			<div >
				{
					state ? <PopWindowPostStory /> : <></>
				}

				<section className='create-post'>
					<h2>Create Post</h2>
					<div className='text'>
						<img src={data?.poster_img} alt='logo' />
						<span onClick={() => {setState(!state)}} >Write something here...</span>
					</div>
					<div className='options' >
						<button>&#127924;<span>Photo</span></button>
						<button>&#128113;<span>Tag Friend</span></button>
						<button> &#128512; <span>Felling/Active</span></button>
					</div>
				</section>


			</div>
		</div>
	)

}

export default CreatePost;