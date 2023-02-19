import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMessage, faShare } from '@fortawesome/free-solid-svg-icons';
import Comments from './Comments';

export default function InteractionField({ idComment, postdata }) {
    const [commnetOpenClose, setCommentState] = useState({
        id: null,
        event : false
    })
    return (
        <>
        <div className='interact-fields'>
                <ul>
                    
				<li onClick={(e) => e.target.style.color !== 'red' ? e.target.style.color = 'red' : e.target.style.color = 'black'} ><FontAwesomeIcon icon={faThumbsUp} /> Like</li>
                    <li onClick={(e) => {
                        setCommentState((prv) => {
                            return {...prv , id :e.target.attributes.idcomment?.value , event : !prv.event }
                        })
                   
                }} idcomment={idComment}  ><FontAwesomeIcon   icon={faMessage} />comment</li>
				<li><FontAwesomeIcon icon={faShare} />share</li>
			</ul>	
            </div>
            <Comments postdata={postdata}  localIdComment={idComment} commentEvent={commnetOpenClose}  ></Comments>
        </>
    )
}