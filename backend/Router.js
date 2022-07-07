const express = require('express') ;
const router = express.Router() ;
const session = require('express-session') ;
const uniqid =  require('uniqid') ;
const body =  require('body-parser') ;
const mongoose = require('mongoose') ;
const fs = require('fs') ;
const path =  require('path') ;
const multer = require('multer');

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
		mobile : String, 
		address : String ,
		brith_date : String, 
		live_in : String ,
		gender : String , 
		website : String ,
		socil_link : String, 
		
})

const phostesSchema = new mongoose.Schema({


		image : String ,
		comments : Array ,
		title : String ,
		body : String,
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
	full_Name : String ,
	id_user :  String ,
	poster_img : String ,
	background_img : String,
	information : usersInframtionSchema ,

	friends: Array , 
	postes : [ phostesSchema ],
	followers : Number , 
	following : Number ,

	notifications : [notificitioSchema],

	settings : SettingsUserSchema
})
const users =  mongoose.model('accounts_user' , SchemaAccount)
const info_users = mongoose.model('info_users' , SchemaInfo_users )

//////////////////////////////////////////////////////////////////

const oneDay = 1000 * 60 * 60 * 24;

router.use(session({

	secret : uniqid(), 
	resave : false ,
	saveUninitialized : true ,
	cookie : {maxAge : oneDay}
}))

router.get('/session' , (req , res) => {
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
		console.log(req.body)
		const resData =  JSON.parse(Object.keys(req.body)[0]);

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
			postes : [
			{
				image : '' ,
				comments : [] ,
				titel : "Unknown" ,
				body : "Unknown" ,
				likes : 0 ,
			}
			],
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


router.post('/singin' , (req , res) => { 

	const req_data_user =  JSON.parse(Object.keys(req.body)[0])
	console.log(req.body)
	const query =  {'email' :  req_data_user.email , 'password' : req_data_user.password}
	users.findOne(query)
	.then(data => {

		
		if (data != undefined) {
			req.session.name = uniqid()
			req.session.id_user_login = data.id_user
			
			res.send({"status" : true})


		} else {
			res.send({"status" : false})
		}
		
	} ).then(err => {
		if (err) throw error
	})

})

router.get('/information_user' ,(req , res) => { 
	const searchDataUser = async (callBack) => {
			if (req.session.name) {
			await	info_users.findOne({"id_user"  : req.session.id_user_login})
					.then(data => {
					
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


router.post('/update_info' , (req , res) => {
		const resData =  JSON.parse(Object.keys(req.body)[0])
		if (req.session.name) {
			info_users.findOneAndUpdate({ "id_user" :req.session.id_user_login} , {full_Name : resData.full_Name} , {new : true})
			.then((info) => console.log(info))

			info_users.findOneAndUpdate({ "id_user" :req.session.id_user_login} , {information : resData} , {new : true})
			.then((info) => {
				res.send({'status' : true})
			} )
		}else {
		res.end()
		}

})
	
// Upload images //////////////////////////////

var storage = multer.diskStorage({
	destination: (req , file , callBack) => {

		callBack(null , 'images/profile' )
	},
	filename : (req , file , callBack) => {
		console.log(file)

		var uniqName = uniqid() + file.originalname;
		if (req.session.id_user_login) {
			info_users.findOneAndUpdate({"id_user" : req.session.id_user_login} , {"poster_img" : `/images/profile/${uniqName}`}).then((data) => console.log(data))
		}
		callBack(null ,  uniqName)
	}
})
var mult = multer({
	storage : storage 
})

router.post('/update_images' , mult.single('img') , (req , res) => {

	res.send({"status" : true})
})
//////////////////////////////////
// postes 
let Stack = '' ;
async function up() {
	var storage = multer.diskStorage({
		destination: (req , file , callBack) => {

		callBack(null , 'images/public_img' )
		},
		filename : (req , file , callBack) => {
			console.log(file)
			var uniqName = `${uniqid()}${file.originalname}`;
			Stack = uniqName
			callBack(null ,  uniqName)
		}

	})

	return multer({
		storage : storage
	})
}
up().then(data =>  {
	router.post('/upload_post', data.single('img')  , (req , res) => {
 		res.send({"status" : true})
 	}) 
})

router.post('/upload_text_post',(req ,res) => {

	
	

	const resData = JSON.parse(Object.keys(req.body)[0]) ;

	const data_post = {
		image :  `/images/public_img/${Stack}` ,
		title : resData.title,
		body : resData.msg ,
		likes : 0 
	}
	if (req.session.name) {

		info_users.findOne({"id_user" : req.session.id_user_login}).then((data) => {
			data.postes.push(data_post)
			data.save()
			
			
			res.send({"status" : true})
			
		})
		
	}else {

		res.send({"status" : false})
	}
	
	
})

router.get('/public_news' , (req ,res) => {

	info_users.find({}).then(data => {
		console.log(data)
		res.send(data)
	}).then(err => {

	})
	// res.send('done')
})

module.exports = router ;


