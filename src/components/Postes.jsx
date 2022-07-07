import React , {useState , useEffect} from 'react' ;
import axios from 'axios' ;
import '../css/postes.css' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faPaperPlane , 
	faThumbsUp, faMessage , faShare
} from '@fortawesome/free-solid-svg-icons'; 
import CreatePost from './Createpost.jsx' ;
import Story from './Story.jsx' ; 
import Groups from './Groups.jsx' ;

const img =  require('../images/avatar.jpg') ;
var today = new Date();
const data =  {
	name : 'hamda' , 
	date :  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() ,
	comment : 'yes  you cant do that '
}

const logo = require('../images/avatar.jpg')
function Comments ({event}) {
	const [dataComment] =useState([data])

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

function Postes(props) {
	
	const [clickState , setClickState] = useState(false) ;
	 

	const [datauser ,setdata] = useState()
    useEffect(() => {

		axios.get('/route/information_user').then((data) => {
			setdata(data.data)
		})


	} , [])
	
	const a = [1,1,1]
	return (

		<div className='containerMainpage'>
			
			<div className='all-postes-content'>
				<div className='postes-news-all'>
					<CreatePost data={datauser} />
					<div className='postes-news'>
					{
						datauser?.postes.map((data , index) => {

							return (
								<div className='cart' key={`${index}h`}>
									<div className='head' >
									 	<div className='info'>
										 	<img src={datauser?.poster_img} alt='logo' />
										 	<div className='text'>
										 		<span>{datauser?.full_Name}</span>
											 	<span>{data.date.slice(0 , 10)}</span>
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
										{data?.body}	
									</p>
									{
										data?.image.length != 0 ? <img src={data?.image } alt='myphoto' /> : ''
									}
									
									<Likes />
					        	</div>
							)
						})
					}
					</div>
				</div>
				<div className='childs-props'>

				{
					props.child ?  props.child.map((ele , index) => {
						return (
								<div key={index}>
									{ele}
								</div>
								)
					}) : (
						<>
						<Story />
						<Groups />
						</>
					)
				}
				</div>
			</div>
		</div>
		)
}

export default Postes ;