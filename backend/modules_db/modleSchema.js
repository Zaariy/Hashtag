const mongoose = require('mongoose') ;

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



module.exports = {users , info_users }