import React , {useState} from 'react' ;
import '../css/postes.css' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faPaperPlane , 
	faThumbsUp, faMessage , faShare
} from '@fortawesome/free-solid-svg-icons'; 

const img =  require('../images/avatar.jpg') ;
const imgtow = require('../images/backgroundsinguptow.jpg');
var today = new Date();
const data =  {
	name : 'hamda' , 
	date :  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() ,
	comment : 'yes  you cant do that '
}


function Comments ({event}) {
	const [dataComment , setDataComment ] =useState([data])

	return (
		<div className='post-comments' style={{'display' : event ? 'block' : 'none' }}>
			{
				dataComment.map((data , index) => {
					return (
							<div className='cart-comments' key={index}>
								<img src={img} alt='img' />
								<div className='text'>
								<span>{data.name}</span>
								<span>{data.date}</span>
								<p>
									{data.comment}
								</p>
							</div>
			</div>
					)
				})
			}	
			<div className='send'>
				<input type='text' name='comment' placeholder='Write comment here...' />
				<FontAwesomeIcon icon={faPaperPlane} />
			</div>

		</div>
		)
}

function Likes() {
	const [state , setState ] = useState(false) ;
	return (
		<>
		<div className='likes'>
			<div className='content' >
				<ul>
					<li onClick={(e) => e.target.style.color !== 'red' ? e.target.style.color =  'red' : e.target.style.color =  'black'} ><FontAwesomeIcon  icon={faThumbsUp} /> Like</li>
					<li onClick={() => setState(!state)} ><FontAwesomeIcon  icon={faMessage} />comments</li>
					<li><FontAwesomeIcon  icon={faShare}  />share</li>
				</ul>
			</div>
		</div>
		<Comments event={state} />
		</>
		)
}

function Postes() {

	const [clickState , setClickState] = useState(false) ;
	// add id 


	const a = [1,1,1]
	return (

		<div className='containerMainpage'>
			<div className='postes-news'>
				{
					a.map((data , index) => {

						return (
							<div className='cart' key={index}>
					<div className='head'>
					 	<div className='info'>
						 	<img src={img} alt='logo' />
						 	<div className='text'>
						 		<span>Sara</span>
							 	<span>2020-10-15</span>
						 	</div>
					 	</div>
					 	<div className='select'>
					 		<span onClick={() =>  setClickState(!clickState)} >...</span>
					 		<ul style={{'visibility' : clickState ? 'visible' : 'hidden'}} >
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
						Google LLC is an American multinational technology company that focuses on
						artificial intelligence, search engine technology, online advertising, cloud 
						computing, computer software, quantum computing, e-commerce, and consumer electronics
					</p>
					<img src={imgtow} alt='myphoto' />
					<Likes />
				</div>
						)
					})
				}
			</div>
		</div>
		)
}

export default Postes ;