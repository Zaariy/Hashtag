const express = require('express') ;
const router = express.Router() ;
const session = require('express-session') ;
const {v4: uuidv4} =  require('uuid') ;
const body =  require('body-parser') ;




let data = [{
	"email" : "hamda@gmail.com" ,
	"password" : "1234"
}]

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
		data.push(resData)
		res.status(200).send({'data' : true})
})

const usersfind = ( req , res , next) => {

	
	const dataUsers = JSON.parse(Object.keys(req.body)[0]);
	const resolut = data.find((ele) => {
		return ele.email == dataUsers.email && dataUsers.password == ele.password
	})

	console.log(resolut)
	
		if (resolut) {
			req.session.name = uuidv4() ;
			console.log(req.session.name)
			res.status(200).send({'status' : true})
		} else {
			
			res.status(200).send({'status' : false})
		}
	
	next()
}




router.use(usersfind)
router.post('/singin' , (req , res) => {
	
	console.log('yp')

})



module.exports = router ;