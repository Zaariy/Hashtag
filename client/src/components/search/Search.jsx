import React, { useState, useEffect } from 'react';
import Navigation from '../nav/Navigation.jsx';
import './search.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Search() {
	const [dataUser, setdata] = useState(null)
	const useLoc = useLocation()
	const name = useLoc.state?.name
	
	useEffect(() => {
		axios({
			url: '/api/user_search_by_name',
			
			method : 'POST' ,
			data: {
				token  : localStorage.getItem('token') ,
				full_Name : name ,
			}
		}).then(state => {
			setdata(state.data)
		}) 

	}, [name]) 
	
	

	return (
		<>
			<Navigation />
			<div className='containerMainpage'>
				<div className='search-users-page'>
					{/*<h1>Search Page </h1>*/}
					{
						dataUser?.status === "ok" ? (
							dataUser?.data?.map((user, index) => {
								return (

									<div className='cart-search' key={index}>
										<Link to={'/profile'} state={{ "id": user?.id_user_platform }}><img src={user?.poster_img} alt="logo" /></Link>
										<h2>{user?.full_Name}</h2>
										<p>	{user?.information.brith_date}</p>
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

export default Search;