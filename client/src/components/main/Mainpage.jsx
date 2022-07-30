import React from 'react';
import Navigation from '../nav/Navigation';
import Postes from '../postes/Postes';
import Loading from '../loading/LoadingPage';
import Fetch_api from '../../fetch_api_data.js'

function MainPage() {
	const { data_fetch, loading } = Fetch_api('/route/public_news')


	return (
		<>
			{
				loading ?
					<div className='mainpage'>
						<Navigation />
						<Postes user_public_data={data_fetch} />
					</div>
					: <Loading />
			}
		</>
	)
}


export default MainPage;