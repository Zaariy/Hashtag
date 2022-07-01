import React , {useState} from 'react' ;
import '../css/postes.css' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'; 

const img =  require('../images/avatar.jpg') ;
const imgtow = require('../images/backgroundsinguptow.jpg');
var today = new Date();
const data =  {
	name : 'hamda' , 
	date :  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() ,
	comment : 'yes  you cant do that '
}


function Comments () {
	const [dataComment , setDataComment ] =useState([data])

	return (
		<div className='post-comments'>
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

function Postes() {

	const [clickState , setClickState] = useState(false) ;
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
					 		<span onClick={() => setClickState(!clickState)}>...</span>
					 		<ul style={{'visibility' : clickState ? 'visible' : 'hidden' }}>
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
					<Comments />
				</div>
						)
					})
				}
			</div>
		</div>
		)
}

export default Postes ;