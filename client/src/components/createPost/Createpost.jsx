import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './createpost.css';
import { decodeJWTtoken} from '../../utils/helperFunctions';
import { useSelector } from 'react-redux';
import FormData from 'form-data';
import axios from 'axios';

/*
 I did 'PopWindow and CreatePostChild' as component childs 
 to access one state 
*/

function CreatePost() {

	const [state, setState] = useState(false);
	const [image, setImage] = useState(false);
	const [selectedImg, setSelectedImg] = useState();
	const [file, setFile] = useState()
	const data = useSelector(state => state.userData.data)


	function showUploadImg(event) {
		// This function shows us an image we had selected before		
		setSelectedImg(URL.createObjectURL(event.target.files[0]))
	}

	function hundleData(e) {
		e.preventDefault()

		const d = Array.from(e.target)
		const inputText = d[0].value
		// send img First because it has Content-Type : multipart/form-data
		hundleUpload(inputText)

	}

	function hundleUpload(text) {
		const formdata = new FormData()
		formdata.append('img', file)
		formdata.append('artical_post', text)
		formdata.append('id_user_platform' , decodeJWTtoken(localStorage.getItem('token')).id_user_platform)
		formdata.append('token', localStorage.getItem('token'));


		axios({
			url: `/uploads/post`,
			method: `POST`,
			headers: {
				"Content-Type": `mulitpart/form-data`
			},

			data: formdata,

		}).then((data) => data.data.status ? setState(false) : '')
	}
	function PopWindow() {
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
					<form onSubmit={hundleData} encType='multipart/form-data' method='POST' >
						<input type='text' name='story' placeholder='Write something here...' />
						{
							image ? <div className='upload-image' ><img src={selectedImg} alt='user' /></div> : ''
						}
						<label htmlFor='fileimg' >&#127924; Photo</label>
						<p><input type='file' id='fileimg' name='img' accept='image/*' onChange={(event) => {
							setImage(!image)
							setFile(event.target.files[0])
							showUploadImg(event)
						}} /></p>
						<button >Send</button>
					</form >
				</div>
			</div>

		)
	}


	function CreatePostChild() {
		return (
			<div >
				{
					state ? <PopWindow /> : <></>
				}

				<section className='create-post'>
					<h2>Create Post</h2>
					<div className='text'>
						<img src={data?.poster_img} alt='logo' />
						<span onClick={() => setState(!state)} >Write something here...</span>
					</div>
					<div className='options' >
						<button>&#127924;<span>Photo</span></button>
						<button>&#128113;<span>Tag Friend</span></button>
						<button> &#128512; <span>Felling/Active</span></button>
					</div>
				</section>


			</div>
		)
	}
	return (
		<div>
			<CreatePostChild />
		</div>
	)

}

export default CreatePost;