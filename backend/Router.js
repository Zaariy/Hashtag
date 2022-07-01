const express = require('express') ;
const router = express.Router() ;
const session = require('express-session') ;
const {v4: uuidv4} =  require('uuid') ;
const body =  require('body-parser') ;


// const body =  require('body-parser') ;

// router.use(body.json())
// router.use(body.urlencoded("extended" : true , 'instead' : false))

const data = {
	"email" : "hamda@gmail.com" ,
	"password" : "1234"
}

router.use(session({

	secret : uuidv4() , 
	resave : false ,
	saveUninitialized : true 
}))

router.post('/singin' , (req , res) => {
	
	const resData =  JSON.parse(Object.keys(req.body)[0])
 	
	console.log(resData)
	if (resData != '{}') {
		if (resData.email === data.email && resData.password === data.password) {
			req.session.name = uuidv4() ;
			console.log(req.session.name)
			res.status(200).send({'status' : true})
		} else {
			
			res.status(200).send({'status' : false})
		}
	} else {
			res.status(200).send({'status' : false})
	}

	
	// res.status(200).send({'connection' : 'seccess'})
})

router.post('/session' , (req , res) => {
	if (req.session.name) {
		res.status(200).send({"session" : req.session.name})
	}else {
		res.status(200).send({"session" : false})
	}

})

router.post('/logout' , (req ,res) => {
	req.session.destroy()
	res.send({'status' : 'seccess'})
})




module.exports = router ;