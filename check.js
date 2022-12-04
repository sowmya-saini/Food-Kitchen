const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


var exp = require('express')  
var ap = exp()
let alert = require('alert');
ap.get('/home',function(req,res){
  res.sendFile(__dirname + "/dashboard.html");
})
ap.get('/signup_explore',function(req,res){
  res.sendFile(__dirname + "/prosignup.html");
})
ap.get('/login_explore',function(req,res){
  res.sendFile(__dirname + "/prologin.html");
})

ap.get('/prologin', function(req, res){
  res.sendFile(__dirname + "/prologin.html");
})
ap.get('/prosignup', function(req, res){
  res.sendFile(__dirname + "/prosignup.html");
})

ap.get('/signupsubmit', function (req, res) {  
    db.collection('todo').add({
    name:req.query.Name,
    email:req.query.mail,
    password : req.query.password1,
    PhNo: req.query.mobileNo,
    })
    res.sendFile(__dirname + "/prologin.html");
})
ap.get('/loginsubmit', function(req, res){
    var flag = false;
    db.collection('todo').where('email', '==', req.query.username).where('password', '==', req.query.password).get().then(function(docs){
      docs.forEach((doc) => {
        flag = true;
        res.sendFile(__dirname + "/index.html");
      })
      if(!flag){
       res.sendFile(__dirname + "/prologin.html");
       alert("Invalid Credentials");
      }
    })
})
ap.get('/logout',function(req,res){
  res.sendFile(__dirname+"/logout.html");
})
ap.listen(3003, function () {  
  console.log('Example app listening on port 5000!')  
})