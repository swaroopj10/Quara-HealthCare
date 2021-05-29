var express= require("express");
var bodyParser= require("body-parser");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/SignUp",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
var db=mongoose.connection;
db.on('error', console.log.bind(console, "Connection Error"));
db.once('open', function(callback){
    console.log("Connection Succeeded");
})

var app=express()



app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var username = req.body.username;
	var email =req.body.email;
	var pass1 = req.body.pswd1;
    var pass2 = req.body.pswd2;
	

	var data = {
		"username": username,
		"email": email,
		"password1": pass1,
        "password2": pass2,
		
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Sign Up Successful");
        
			
	});
		
	return res.redirect('Home/Home.html');
})



app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("Server listening at port 3000");
