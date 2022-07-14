const express = require('express') ;
const router = express.Router() ;
const session = require('express-session') ;
const uniqid =  require('uniqid') ;
const body =  require('body-parser') ;
const mongoose = require('mongoose') ;
const {users , info_users , comments_postes} = require('./modules_db/modleSchema.js') ;
const fs = require('fs') ;
const path =  require('path') ;
const multer = require('multer');



// Here put your local url for Mongodb  between url='put you url '
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



/*
 	This path for when the user logs in 
	it give him a session to be able to move on paths 
 */
router.get('/session' , (req , res) => {
	if (req.session.name) {
		res.status(200).send({"session" : req.session.name})
	}else {
		res.status(200).send({"session" : false})
	}

})

// this is for when the user logs out from website, this function  destroys the session
router.post('/logout' , (req ,res) => {
	req.session.destroy()
	res.send({'status' : 'seccess'})
})



router.get('/information_user/:id' ,(req , res) => { 
	const searchDataUser = async (callBack) => {
			if (req.session.name) {
			await	info_users.findOne({"id_user"  : req.params.id})
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
	

router.get('/public_news' , (req ,res) => {

	if (req.session.name) {
		info_users.find({}).then(data => {
			res.send(data)
		}).then(err => {

		})
	}else {
		res.send({"status" : false , "msg" : "you ara not authorize to Access this data"})
	}
	
})
router.get('/search_users/:id' , (req , res) => {
	const data = req.query.name ;
	try {

		info_users.find({full_Name : req.params.id})
			.then(data => {
				res.send(data)
				
		}).then(err => {
			console.log(err)

		})
	} catch(err)  {
		console.log(err)
		
	}
	
})

router.post('/post_comments' , (req , res) => {
	const resData =  JSON.parse(Object.keys(req.body)[0])
	const id_uniqe = uniqid()
		const data = {
			name : resData.name,
			msg : resData.msg ,
			img : resData.img,
			id_user : resData.id_user   , 
		}
		if (req.session.name) {
			console.log(resData)
			comments_postes.updateOne({id_post : resData.id_post} , {$push :{comments : data }}).then(d => console.log(d))
		}else {

			res.send({"status" : false , "msg" : "you ara not authorize to Access this data"})
		}
		
		
		

		res.send('yes')

	})
	
router.get('/get_comments/:id'  , (req , res) => {
	if (req.session.name) {
			comments_postes.findOne({id_post : req.params.id}).then(data => {
			res.send(data)
		})
	}else {
		res.send({"status" : false , "msg" : "you ara not authorize to Access this data"})
	}
	
	

})

module.exports = router ;


