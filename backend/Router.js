const express = require('express') ;
const router = express.Router() ;
const session = require('express-session') ;
const uniqid =  require('uniqid') ;
const body =  require('body-parser') ;
const mongoose = require('mongoose') ;

////////////////////  Databases ////////////////////////////
const url =  'mongodb://localhost:27017/hashtag' ;

async function StartMongoose() {
	try {
		await mongoose.connect(url , {
			useNewUrlParser : true , 
			useUnifiedTopology : true 
		})

		console.log("Database Connected" , url)
	}catch (err) {
		console.log(err)
	}
}

// Start Database Mongoose
StartMongoose()

// Schemas
const same_id = uniqid() ;
const SchemaAccount = new mongoose.Schema({
		id_user : String ,
		email : {type : String , require : true} ,
		password  : String  ,
		full_Name : String ,
		date_login : {type : Date , default : Date.now},

})

const usersInframtionSchema = new mongoose.Schema({
	about : String,
		poster_img : String ,
		background_img : String,
		mobile : String, 
		address : String ,
		brith_date : String, 
		live_in : String ,
		gender : String , 
		website : String ,
		socil_link : String, 
		followers : Number , 
		following : Number
})

const phostesSchema = new mongoose.Schema({


		image : String ,
		_id_comment : String ,
		titel : String ,
		date : {type : Date , default : Date.now} ,
		likes : Number ,
	
})
const notificitioSchema =  new mongoose.Schema(

	{
		id_notification  : String ,
		id_person : String , 
		message : String,
		date : {type : Date , default : Date.now  }
	}

	)
const SettingsUserSchema =  new mongoose.Schema({
	mode : String
	})
const SchemaInfo_users = new mongoose.Schema({
	id_user :  String ,
	information : usersInframtionSchema ,

	friends: Array , 
	postes : [ phostesSchema ],

	notifications : [notificitioSchema],

	settings : SettingsUserSchema
})
const users =  mongoose.model('accounts_user' , SchemaAccount)
const info_users = mongoose.model('info_users' , SchemaInfo_users )

//////////////////////////////////////////////////////////////////


router.use(session({

	secret : uniqid(), 
	resave : false ,
	saveUninitialized : true 
}))

router.post('/session' , (req , res) => {
	if (req.session.name) {
		res.status(200).send({"session" : req.session.name})
	}else {
		res.status(200).send({"session" : false})
	}

})

router.post('/logout' , (req ,res) => {
	req.session.destroy()
	console.log('session destroy')
	res.send({'status' : 'seccess'})
})

router.post('/singup' , (req , res) => {
		const resData =   JSON.parse(Object.keys(req.body)[0]);

		const user  = new users({
			id_user : same_id ,
			email : resData.email,
			password : resData.password ,
			full_Name : resData.full_Name 
		})
		const informationUsers = new info_users({
			id_user : same_id ,
			information : {
				about : "Unknown",
				poster_img : "Unknown" ,
				background_img : "Unknown",
				mobile : "Unknown", 
				address : "Unknown" ,
				brith_date : "Unknown" , 
				live_in : "Unknown"  ,
				gender : "Unknown"  , 
				website : "Unknown" ,
				socil_link : "Unknown", 
				followers : 0 , 
				following : 0 ,
			},
			friends : [] ,
			postes : [
			{
				image : '' ,
				_id_comment : "Unknown" ,
				titel : "Unknown" ,
				likes : 1 ,
			}
			],
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


router.post('/singin' , (req , res) => { 

	const req_data_user =  JSON.parse(Object.keys(req.body)[0])
	const query =  {'email' :  req_data_user.email , 'password' : req_data_user.password}
	users.findOne(query)
	.then(data => {

		console.log(data)
		if (data != undefined) {
			req.session.name = uniqid()
			req.session.id_user_login = data.id_user

			res.send({"status" : true})


		} else {
			res.send({"status" : false})
		}
		
	} ).then(err => {
		console.log(err)
	})

})

router.post('/information_user' ,(req , res) => { 
	const searchDataUser = (callBack) => {
			if (req.session.name) {
				console.log(req.session.id_user_login)
				info_users.findOne({"id_user"  : req.session.id_user_login})
					.then(data => {
					console.log(data)
					res.send(data)
				}).then(err => console.log(err))
			}

			callBack()

	}


	function endreq () {
		res.end()
	}
	searchDataUser(endreq)
		
})


	


	

module.exports = router ;


