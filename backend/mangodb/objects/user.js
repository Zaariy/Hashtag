const userIntailize = {  
	"_id" : 0 ,
	"information" : {

		"about" : "",
		"poster_img" : "" ,
		"background_img" : "",
		"mobile" : "", 
		"address" : "" ,
		"brith_date" : "", 
		"live_in" : "" ,
		"gender" : "" , 
		"website" : "" ,
		"socil_link" : ""

	},

	"friends": [] , 
	"postes" : [{
		"image" : "" ,
		"_id_comment" : "" ,
		"titel" : "" ,
		"date" : "" ,
		"likes" : "" ,
	}],

	"notifications" : [],

	"settings" : {
		"mode" : "light"
	}
}

const accounts = {
		"_id" : 0 ,
		"email" : "" ,
		"password" : "" ,
		"full_Name" : "" ,
		"date_login" : 0
	
}

module.exports = {userIntailize , accounts} ;