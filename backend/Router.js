const express = require('express') ;
const router = express.Router() ;
const session = require('express-session') ;
const {v4: uuidv4} =  require('uuid') ;
const body =  require('body-parser') ;
const {addNewUser , searchUser} =  require('./mangodb/db_library/initialize_db.js')


router.use(session({

	secret : uuidv4() , 
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
		const resData =  JSON.parse(Object.keys(req.body)[0])
		// for expmle databases ;
		addNewUser({'full_Name' : resData.fname , 
			'password' : resData.password , 
			'email' : resData.email})
		res.status(200).send({'data' : true})
})

const usersfind = async ( req , res , next) => {
	const dataUsers = JSON.parse(Object.keys(req.body)[0]);
	const resolut =  await searchUser({"email" : dataUsers.email , "password" : dataUsers.password} , 'accounts_users', (db) => {
		
		if (db) {
			req.session.name = uuidv4() ;
			console.log(req.session.name)
			res.status(200).send({'status' : true})
		} else {
			
			res.status(200).send({'status' : false})
		}
	}) 
	 
	next()
}
router.use(usersfind)
router.post('/singin' , (req , res) => {
})



module.exports = router ;


