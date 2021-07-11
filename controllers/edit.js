var express = require('express');
var router = express.Router();
var User = require('../models/User');
var flash = require('express-flash');
var ejs = require('ejs');
var path = require('path');

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname + '../views/css')));

router.get('/edit', function(req, res, next) {
    User.findOne({ unique_id: req.session.userId }, function(err, data) {

        if (!data) {
            res.redirect('/');
        } else {
            return res.render('edit.ejs', { "name": data.name, "email": data.email,"phone":data.phone });
        }
    });
});

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var personInfo = req.body;


    if (!personInfo.RegisterEmail || !personInfo.Name || !personInfo.PhoneNumber || !personInfo.RegisterPassword) {
        res.send();
    } else {
            User.findOne({ email: personInfo.RegisterEmail }, function(err, data) {
                if (!data) {
                    var c;
                    User.findOne({}, function(err, data) {

                        if (data) {
                            c = data.unique_id + 1;
                        } else {
                            c = 1;
                        }

                        var newPerson = new User({
                            unique_id: c,
                            email: personInfo.RegisterEmail,
                            name: personInfo.Name,
                            phone: personInfo.PhoneNumber,
                            password: personInfo.RegisterPassword
                        });

                        newPerson.save(function(err, Person) {
                            if (err)
                                console.log(err);
                            else
                                console.log('Success');
                        });

                    }).sort({ _id: -1 }).limit(1);
                    res.redirect('/login')
                    console.log('User added Successfully,Please Login')
                } else {
                    res.redirect('/login')
                    console.log('User already exists,please Login')
                }

            });
        
    }
});



router.post('/login', function(req, res, next) {
    
    User.findOne({ email: req.body.LoginEmail }, function(err, data) {
        if (data) {

            if (data.password == req.body.LoginPassword) {
                req.session.userId = data.unique_id;
                res.redirect('/home')
                console.log('Login Succesful')

            } else {
                res.redirect('/login')
                console.log('Incorrect Password')
            }
        } else {
            res.redirect('/login')
            console.log('User does not exist')
        }
    });
});

router.post('/changepass', function(req, res, next) {
    
    User.findOne({ email: req.body.email }, function(err, data) {
        if (!data) {
            res.send({ "Success": "This Email Is not regestered!" });
        } else {
            
            if (req.body.password == req.body.passwordConf) {
                data.password = req.body.password;
                

                data.save(function(err, Person) {
                    if (err)
                        console.log(err);
                    else
                        console.log('Success');
                    res.send({ "Success": "Password changed!" });
                });
            } else {
                res.send({ "Success": "Password does not matched! Both Password should be same." });
            }
        }
    });

});

module.exports = router;