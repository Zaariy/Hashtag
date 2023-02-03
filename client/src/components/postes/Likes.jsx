import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMessage, faShare } from '@fortawesome/free-solid-svg-icons';

function Likes({openCloseCommentEvent}) {



	return (
		<>
			<div className='likes'>
				<div className='content' >
					<ul>
						<li onClick={(e) => e.target.style.color !== 'red' ? e.target.style.color = 'red' : e.target.style.color = 'black'} ><FontAwesomeIcon icon={faThumbsUp} /> Like</li>
						<li  ><FontAwesomeIcon onClick={() =>  openCloseCommentEvent()} icon={faMessage} />comments</li>
						<li><FontAwesomeIcon icon={faShare} />share</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Likes;