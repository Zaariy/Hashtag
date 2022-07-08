import React , {useState} from 'react' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; 

/*
	This components render in every Post 
	on Postes {Postes.jsx} Page 
*/
var today = new Date();
const data =  {
	name : 'hamda' , 
	date :  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() ,
	comment : 'yes  you cant do that '
}
function Comments ({event}) {
	const [dataComment] =useState([data])
	return (
		<div className='post-comments' style={{'display' : event ? 'block' : 'none' }}>
			{
				dataComment.map((data , index) => {
					return (
							<div className='cart-comments' key={index}>
								<img src={"#"} alt='img' />
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

export default Comments  ;