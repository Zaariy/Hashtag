import React , {useState , useEffect} from 'react' ;
import Navigation from './Navigation.jsx' ;
import '../css/search.css' ;
import {useLocation } from 'react-router-dom' ;
import {Link} from 'react-router-dom' ;
import axios from 'axios' ;


function Search (props) {
	const [dataUser , setdata ] = useState(null)
	const useLoc = useLocation()
	const name = useLoc.state?.name

	useEffect(() => {
		axios.get(`/route/search_users/${name}`).then(data => setdata(data.data))

		return () => {
			setdata(null)
		}
	} , [])

	
	return (
		<>
			<Navigation />
			<div className='containerMainpage'>
				<div className='search-users-page'>
					{/*<h1>Search Page </h1>*/}
					{
						dataUser ? (
							dataUser?.map((ele , index) => {
								return (

									<div className='cart-search' key={index}>
								<Link to={'/profile'} state={{"id" : ele?.id_user}}><img src={ele?.poster_img} alt="logo"/></Link>
								<h2>{ele?.full_Name}</h2>
								<p>	{ele?.information.brith_date}</p>
									</div>
						)
					})
				) : <div>Not Found</div>
			}
		</div>
			</div>
		</>
	)
}

export default Search ;