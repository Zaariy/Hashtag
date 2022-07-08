import React , {useState} from 'react' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faPaperPlane , 
faThumbsUp, faMessage , faShare
} from '@fortawesome/free-solid-svg-icons'; 
import Comments from './Comments.jsx' ;

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

export default Likes ;