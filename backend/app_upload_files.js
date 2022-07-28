const multer = require('multer') ;
const express = require('express') ;
const uniqid =  require('uniqid') ;
const mongoose = require('mongoose');
const {comments_postes} = require('./modules_db/modleSchema.js')
const {info_users} = require('./modules_db/modleSchema.js')
const router = express.Router()



/*
	this for uploading Img Profile
*/
var storageProfileImg = multer.diskStorage({
	destination:  (req , file , callBack) => {
		 callBack(null , './images/profile' )
	},
	filename :  (req , file , callBack) => {
		
		var uniqName = `${uniqid()}${file.originalname}`;
		 callBack(null ,  uniqName)
		}
	})

const mutlProfileImg =  multer({
	storage : storageProfileImg
})

// this is for uploading profile picture
router.post('/images' , mutlProfileImg.single('img') , (req , res) => {

		if (req.session.id_user_login) {
			info_users.findOne({"id_user" : req.session.id_user_login})
			.then((data) => {
			
				data.poster_img = `/images/profile/${req.file.filename}` 
				data.save()
				res.redirect('/edit-profile')

			})

		}else {
			res.send({"status" : false})	
		}
})

/*
	this for uploading Postes 
*/

var storagePostes = multer.diskStorage({
	destination:  (req , file , callBack) => {
		 callBack(null , 'images/public_img' )
	},
	filename :  (req , file , callBack) => {
		
		var uniqName = `${uniqid()}${file.originalname}`;
		 callBack(null ,  uniqName)
		}
	})
const mutlPostes =  multer({
	storage : storagePostes
})
router.post('/post', mutlPostes.single('img') , (req , res) => {
	
	if (req.session.id_user_login) {
		const uniq_id = uniqid()
		info_users.findOne({"id_user" : req.session.id_user_login})
		.then((data) => {
			
			data.postes.push({
				image : `/images/public_img/${req.file?.filename}`  ,
				body : req.body.msg,
				likes : 0,
				id_post : uniq_id
			})
			const comment = new comments_postes({
				id_post : uniq_id ,
				comments : []
			
			
			})
			data.save()
			comment.save()
			res.send({'status' : true})

		})

	}else {
		res.send({"status" : false})	
	}
 	
 }) 


module.exports =  router ;