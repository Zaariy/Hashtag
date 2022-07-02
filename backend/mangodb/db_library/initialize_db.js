const db_mongo = require('./easy-mongodb.js') ;
const path = require('path') ;
const fs =  require('fs') ;
const uuid = require('uuid') ;
const {userIntailize , accounts} = require('../objects/user.js') ;

db_mongo.uri = 'mongodb://localhost:27017' ;

/*
	createDbOrCollection('Db_name' , 'nameCollection' , callBack)
	This function it will create databes named hashtag 

*/

// db_mongo.createDbOrCollection('hashtag' , 'users' , (err) => {
// 	if(err) {
// 		console.log(err)
// 	}

// })


async function addNewUser(data){
	/*
		This function it will add new user 
		to databas

		This data it  nasscry for login
	*/
	const date = new Date();
	// const test = uuid();
	const id = uuid.v1() ;
	let cupyAccount = accounts ;
	let cupyAbout =  userIntailize ;
	
		cupyAccount.date_login = `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()}`  ;
		cupyAccount._id = id ;
		cupyAccount.email = data.email ;
		cupyAccount.full_Name =  data.full_Name ; 
		cupyAccount.password = data.password 
		// user_info database
		cupyAbout._id = id ;
	
	const allData = [{"accounts_users" : cupyAccount} , {"info_users" : cupyAbout}]
	// console.log(cupyAccount)
	allData.map((data) => {
		db_mongo.insertData(data[Object.keys(data)[0]], 'hashtag' , Object.keys(data)[0] , 'one' , (err) => {
			if (err) {
			console.log(err)
			}
		})
		

	})
}

async function searchUser(data , nameCollection , callback) {
	
	await db_mongo.getData('hashtag' , nameCollection  , data  ,  (err , res) => {
		if (err) {
			console.log(err)
		}


	 	return callback(res)
		
	})
	
}


module.exports = {"addNewUser" : addNewUser , "searchUser" : searchUser}

