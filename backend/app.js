const express = require('express') 
const app = express() ;
const route =  require('./Router');
const uploadFiles = require('./app_upload_files') ;
const bodyParser =  require('body-parser') ;
const session = require('express-session') ;
const regiter = require('./app_register_pages') ;
const path = require('path');
const uniqid = require('uniqid');
const fs = require('fs') ;

// This for time Cookie { 1 Day }
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({

	secret : uniqid(), 
	resave : false ,
	saveUninitialized : true ,
	cookie : {maxAge : oneDay}
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/route' , route) ;
app.use('/upload' , uploadFiles)
app.use('/register' , regiter)

// this medelware for searching files  
app.use((req ,res , next) => {
	var imagepath =  path.join(__dirname  , (req.url || 'none')) ;
	fs.stat(imagepath , (err , info ) => {
		// console.log(err)
		if (err) {
			next();
			return
		}
		if (info.isFile()) {
			res.sendFile(imagepath) ;
			
		}else {
			next()
		}
	})

})


app.get('/images' , (req ,res) => {

	res.end()
})
app.listen(8080 , (err) => {
	if (err) {
		console.log(err)
	}
	console.log("Server is runing on : http://localhost:8080")
})