const {users , info_users} = require('./modules_db/modleSchema') ;
const express = require('express');
const register = express.Router() ;
const uniqid = require("uniqid")


register.post('/singup' , (req , res) => {
		const resData =   JSON.parse(Object.keys(req.body)[0]);
		const date = new Date() ;
		const same_id = uniqid(date.getTime())  ;
		const user  = new users({
			id_user : same_id ,
			email : resData.email,
			password : resData.password ,
			full_Name : resData.full_Name 
		})
		const informationUsers = new info_users({
			id_user : same_id ,
			full_Name : resData.full_Name,
			poster_img : "/images/unknown.jpg" ,
			background_img : "/images/unknown.jpg",
			information : {
				about : "Unknown",
				mobile : "Unknown", 
				address : "Unknown" ,
				brith_date : "Unknown" , 
				live_in : "Unknown"  ,
				gender : "Unknown"  , 
				website : "Unknown" ,
				socil_link : "Unknown", 
				
			},

			friends : [] ,
			postes : [],
			followers : 0 , 
			following : 0 ,
			notifications : [] ,
			settings : {
				mode : 'light'
			}
		})
		user.save()
		.then(data => {
			informationUsers.save()
			res.status(200).send({'data' : true})
		}).then(err => console.log(err))	
})

register.post('/singin' , (req , res) => { 

	const req_data_user =  JSON.parse(Object.keys(req.body)[0])
	const query =  {'email' :  req_data_user.email , 'password' : req_data_user.password}
	users.findOne(query)
	.then(data => {

		
		if (data != undefined) {
			req.session.name = data.id_user
			req.session.id_user_login = data.id_user
			
			res.send({"status" : true})


		} else {
			res.send({"status" : false})
		}
		
	} ).then(err => {
		console.log("Error from file /backend/app_register_pages.js/  line : 70 " , err)
	})

})

module.exports = register