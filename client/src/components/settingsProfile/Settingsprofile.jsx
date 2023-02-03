import React, { useState } from 'react';
import Navigation from '../nav/Navigation';
import Loading from '../loading/LoadingPage';
import './setting-profile.css';
import axios from 'axios';
import {useForm } from "react-hook-form";
import { useSelector } from 'react-redux';

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

	const { register, handleSubmit } = useForm()
	const userdata = useSelector(state => state.userData.data);
	// const [updateData, setUpdateData] = useState();
	// const [stateUpdate, setStateUpdate] = useState(false);
	const [resoultUpdateData, setresulUpdatedata] = useState(false);


	// function getValues(e) {
	// 	// body ...
	// 	let dataSand = {}
	// 	let gender = '';
	// 	e.preventDefault()
	// 	const array = Array.from(e.target)

	// 	array.map((ele) => {

	// 		if (ele.value.length !== 0) {
	// 			dataSand[ele.name] = ele.value
	// 			if (ele.checked) {
	// 				// console.log(ele.value)
	// 				gender = ele.value
	// 			}
	// 		}
	// 	})
	// 	dataSand.gender = 'Male'
	// 	delete dataSand.submit
	// 	setUpdateData(dataSand)
	// 	setStateUpdate(true)

	// }


	function shutdown() {
		setTimeout(() => {
			setresulUpdatedata(false)
		}, 4000)
	}

	const onSubmitRequiest = (data) => {
		const keys = Object.keys(data);
		
		for (let i = 0; i < keys.length; i++)	 {
			if (!data[keys[i]] ) {
				data[keys[i]] =  userdata.information[keys[i]]

				// if (keys[i] === "full_Name") {
				// 	data['full_Name'] =  userdata.full_Name
				// }
			}
		}
		axios({
			url: "/api/updateinformationuser",
			method : "POST" ,
			data: {
				token : localStorage.getItem('token') ,
				id_user_platform: userdata.id_user_platform,
				dataupdate : data
			}
		}).then(state => console.log(state))	
	}
	shutdown()
	return (
		<>
			{
				userdata ? (<div className='setting-profile'>
					<Navigation />
					<div className='containerMainpage'>
						<div className='edit-profile'>
							{resoultUpdateData ? <PopWindowSeccessSubmit /> : ''}
							<div className='content' >
								<h1>Personal Information</h1>
								<div>
									<img src={userdata?.poster_img} alt="logo" />
									<form action='/upload/images' className='form-one' method="POST" encType="multipart/form-data">
										<label htmlFor='fileimg' className='editPhoto' >Edit</label>
										<p>
											<input type='file' className='uploadImg' id="fileimg" name='img' />
										</p>
										<button>submit</button>
									</form>
								</div>
								<form onSubmit={handleSubmit(onSubmitRequiest)}>
									<ul>
										<li>
											<label htmlFor='fullname'>Full Name : </label>
											<input type='text'  id='fullname' placeholder={userdata?.full_Name} name='full_Name' />
										</li>
										<li>

											<label htmlFor="about">About :</label>
											<input type='text' id='about'  {...register('about')} placeholder={userdata?.information?.about} name='about' />
										</li>
										<li>
											<label >Gender : </label>
											<div>
												<label htmlFor="male">Male</label>

												<input type='radio' id='male' {...register('gender')} name='gender'  />
											</div>
											<div>
												<label htmlFor="female">
													Female
												</label>
												<input type='radio' id='female'  {...register('gender')} name='gender'  />
											</div>
										</li>

										<li>
											<label htmlFor="mobile">Mobile :</label>
											<input id='mobile' type='text' {...register("mobile")} placeholder={userdata?.information?.mobile} name='mobile' />
										</li>
										<li>
											<label htmlFor="birth">Birth Date :</label>
											<input id='birth' type='date' {...register("brith_date")} placeholder={userdata?.information?.brith_date} name='brith_date' />
										</li>
										<li>
											<label htmlFor="address">Address :</label>
											<input id='address' type='text' placeholder={userdata?.information?.address} name='address' />
										</li>
										<li>
											<label htmlFor="city">City :</label>
											<input id='ctiy' type='text' {...register("live_in")} placeholder={userdata?.information?.live_in} name='live_in' />
										</li>

										<li>
											<label htmlFor="website">Website  :</label>
											<input id='website' type='text' {...register("socil_link")}  placeholder={userdata?.information?.socil_link} name='socil_link' />
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