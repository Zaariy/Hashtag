import React from 'react' ;
import '../css/createpost.css' ;

const img =  require('../images/avatar.jpg') ;



function CreatePost () {
	
	return (

	<section className='create-post'>
		<h2>Create Post</h2>
		<div className='text'>
			<img src={img}  alt='logo' />
			<form action='#' method='POST' >
				<input type='text' name='textpost' placeholder='Write somthing here...' />
				<button>Send</button>
			</form>
		</div>
		<div className='options' >
			<button>&#127924;<span>Photo</span></button>
			<button>&#128113;<span>Tag Friend</span></button>
			<button> &#128512; <span>Felling/Acctive</span></button>
		</div>
	</section>
	)
}


export default CreatePost ;