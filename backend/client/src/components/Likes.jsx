import React , {useState} from 'react' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faThumbsUp, faMessage , faShare} from '@fortawesome/free-solid-svg-icons'; 
import Comments from './Comments.jsx' ;

function Likes(props) {
const [state , setState ] = useState(false) ;
const receive_public_data = props.user_public_data



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
	<Comments event={state} user_public_data={receive_public_data} user_spcific_data={props.user_spcific_data} />
	</>
	)
}

export default Likes ;