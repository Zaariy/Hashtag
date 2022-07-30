import React, { useState, useEffect } from 'react';
import Navigation from './Navigation.jsx';
import Fetch_api from '../fetch_api_data.js';
import Loading from './LoadingPage.jsx';
import '../css/setting-profile.css';
import { axiosInc } from '../config.js';

function PopWindowSeccessSubmit() {

	return (

		<div className='edit-profile-Alert-window'>
			<div className='content' >
				Data Update Seccess
			</div>
		</div>
	)
}


function SettingsProfile() {


	const [updateData, setUpdateData] = useState();
	const [stateUpdate, setStateUpdate] = useState(false);
	const [resoultUpdateData, setresulUpdatedata] = useState(false);
	const { data_fetch, loading } = Fetch_api(`/route/information_user/${sessionStorage.getItem("session")}`)
	useEffect(() => {

		if (stateUpdate) {
			axiosInc.post('/route/update_info', JSON.stringify(updateData))
				.then((data) => setresulUpdatedata(data.status))
			setStateUpdate(false)
		}


	}, [stateUpdate])



	function getValues(e) {
		// body ...
		let dataSand = {}
		let gender = '';
		e.preventDefault()
		const array = Array.from(e.target)

		array.map((ele) => {

			if (ele.value.length !== 0) {
				dataSand[ele.name] = ele.value
				if (ele.checked) {
					// console.log(ele.value)
					gender = ele.value
				}
			}
		})
		dataSand.gender = 'Male'
		delete dataSand.submit
		setUpdateData(dataSand)
		setStateUpdate(true)

	}


	function shutdown() {
		setTimeout(() => {
			setresulUpdatedata(false)
		}, 4000)
	}


	shutdown()
	return (
		<>
			{
				loading ? (<div className='setting-profile'>
					<Navigation />
					<div className='containerMainpage'>
						<div className='edit-profile'>
							{resoultUpdateData ? <PopWindowSeccessSubmit /> : ''}
							<div className='content' >
								<h1>Personal Information</h1>
								<div>
									<img src={data_fetch?.poster_img} alt="logo" />
									<form action='/upload/images' className='form-one' method="POST" encType="multipart/form-data">
										<label htmlFor='fileimg' className='editPhoto' >Edit</label>
										<p>
											<input type='file' className='uploadImg' id="fileimg" name='img' />
										</p>
										<button>submit</button>
									</form>
								</div>
								<form action='/' onSubmit={(e) => getValues(e)}>
									<ul>
										<li>
											<label htmlFor='fullname'>Full Name : </label>
											<input type='text' id='fullname' placeholder={data_fetch?.full_Name} name='full_Name' />
										</li>
										<li>

											<label htmlFor="about">About :</label>
											<input type='text' id='about' placeholder={data_fetch?.information?.about} name='about' />
										</li>
										<li>
											<label >Gender : </label>
											<div>
												<label htmlFor="male">Male</label>

												<input type='radio' id='male' name='gender' onClick={(e) => e.checked = true} />
											</div>
											<div>
												<label htmlFor="female">
													Female
												</label>
												<input type='radio' id='female' name='gender' onClick={(e) => e.checked = true} />
											</div>
										</li>

										<li>
											<label htmlFor="mobile">Mobile :</label>
											<input id='mobile' type='text' placeholder={data_fetch?.information?.mobile} name='mobile' />
										</li>
										<li>
											<label htmlFor="birth">Birth Date :</label>
											<input id='birth' type='date' placeholder={data_fetch?.information?.brith_date} name='birth_date' />
										</li>
										<li>
											<label htmlFor="address">Address :</label>
											<input id='address' type='text' placeholder={data_fetch?.information?.address} name='address' />
										</li>
										<li>
											<label htmlFor="city">City :</label>
											<input id='ctiy' type='text' placeholder={data_fetch?.information?.live_in} name='live_in' />
										</li>

										<li>
											<label htmlFor="website">Website  :</label>
											<input id='website' type='text' placeholder={data_fetch?.information?.socil_link} name='socil_link' />
										</li>

										<li>
											<input type='submit' name='submit' value='Save' />
										</li>
									</ul>
								</form>
							</div>
						</div>
					</div>
				</div>) : <Loading />

			}
		</>
	)
}

export default SettingsProfile;