import React , {useState , useEffect} from 'react' ;
import {Link} from 'react-router-dom' ;
import axios from 'axios' ;
import '../css/postes.css' ;
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' ;
import { faPaperPlane , 
faThumbsUp, faMessage , faShare
} from '@fortawesome/free-solid-svg-icons'; 
import CreatePost from './Createpost.jsx' ;
import Story from './Story.jsx' ; 
import Groups from './Groups.jsx' ;

import Likes from './Likes.jsx' ;

// const img =  require('../images/avatar.jpg') ;


// const logo = require('../images/avatar.jpg')

function Postes(props) {

	
	const [clickState , setClickState] = useState(false) ;
	const [datauser ,setdata] = useState(null)

    useEffect(() => {
    	if (!props.dataUser) {
    		axios.get(`/route/information_user/${sessionStorage.getItem("session")}`).then((data) => {
			setdata(data.data)
			return
		})
    	}else {
    		
    		setdata(props.dataUser)

    	}

		return () => {
    		setdata(null)
    	}


	} , [props.dataUser])
	
	
	return (

		<div className='containerMainpage'>
			
			<div className='all-postes-content'>
				<div className='postes-news-all'>
					<CreatePost data={datauser} />
					<div className='postes-news'>
					{
						datauser ? (
							datauser?.postes.map((data , index) => {

							return (
								<div className='cart' key={`${index}h`}>
									<div className='head' >
									 	<div className='info'>
										 	<Link to={'/profile'} state={{"id" : datauser?.id_user}}><img src={datauser?.poster_img} alt='logo' /></Link>
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
							): ''
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