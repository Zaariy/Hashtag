const express = require('express') 
const app = express() ;
const route =  require('./Router');
const body =  require('body-parser') ;
const session = require('express-session') ;

app.use(express.urlencoded({'extended' : true }))

app.use('/route' , route) ;

app.listen(8080 , (err) => {
	if (err) {
		console.log(err)
	}
	console.log("Server is runing on : http://localhost:8080")
})