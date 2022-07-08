import React , {useState , useEffect} from 'react' ;
import Navigation from './Navigation.jsx' ;
import {useLocation } from 'react-router-dom' ;
import {Link} from 'react-router-dom' ;
import axios from 'axios' ;


function Search (props) {
	const [dataUser , setdata ] = useState()
	const useLoc = useLocation()
	const name = useLoc.state?.name

	useEffect(() => {
		axios.get(`/route/search_users/${name}`).then(data => setdata(data.data))
	} , [])

	
	return (
		<div className='search-users-page'>
			<h1>Search Page </h1>
			{
				dataUser ? (
					dataUser?.map((ele) => {
						return (

							<div>
								<h4>{ele?.full_Name}</h4>
								<Link to={'/profile'} state={{"id" : ele?.id_user}}><img src={ele?.poster_img} alt="logo"/></Link>
							</div>
						)
					})
				) : <div>Not Found</div>
			}
			
		</div>
	)
}

export default Search ;