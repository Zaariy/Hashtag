import React , {useState} from 'react' ;
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import {faXmark} from '@fortawesome/free-solid-svg-icons' ;

import '../css/createpost.css' ;

const img =  require('../images/avatar.jpg') ;

/*
 I did 'PopWindow and CreatePostChild' as component childs 
 to access one state 
*/

function CreatePost() {

	const [state , setState] = useState(false) ;
	const [image , setImage] = useState(false) ;
	const [selectedImg , setSelectedImg] = useState() ;


	function showUploadImg (event) {
		// This function shows us an image we had selected before
		
				setSelectedImg(URL.createObjectURL(event.target.files[0]))
	}

	function PopWindow () {
		return (
		<div className='pop-window'>
			<div className='content' >
				<div className='head-post'>
					<h2>Create Post</h2>
					<FontAwesomeIcon icon={faXmark}  onClick={() => setState(!state)}  />
				</div>
				<div className='info'>
					<img src={img}  alt='logo' />
					<span>Sara</span>
				</div>
				<form action='#' method='POST' >
					<input type='text' name='story' placeholder='Write somthing here...' />
					{
						image ? <div className='upload-image' ><img  src={selectedImg} alt='image' /></div> : ''
					}
					<label htmlFor='fileimg' >&#127924; Photo</label>
					<p><input type='file' id='fileimg' name='img' accept='image/*' onChange={(event) => {
						setImage(!image)
						showUploadImg(event)
					}}  /></p>
					<button>Send</button>
				</form >
			</div>
		</div>

		)
	}


	function CreatePostChild () {
		return (
		<div >
		{
			state ? <PopWindow  /> : <></>
		}
				
				<section className='create-post'>
					<h2>Create Post</h2>
					<div className='text'>
						<img src={img}  alt='logo' />
						<span onClick={() => setState(!state)} >Write somthing here...</span>
					</div>
					<div className='options' >
						<button>&#127924;<span>Photo</span></button>
						<button>&#128113;<span>Tag Friend</span></button>
						<button> &#128512; <span>Felling/Acctive</span></button>
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
export default CreatePost ;