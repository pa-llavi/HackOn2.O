/*
steps to connect database to localhost:
    1. Open command prompt and go to this current HackOn folder (cd HackOn)
    2. run : node app.js
    3. open browser and run : http:127.0.0.1:8080 to see the site
*/

const express=require('express');
let app=express();
const fs=require('fs');
const http=require('http');
const path=require('path');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Sheetal:Sheetal992009@dearzindagi.hzvha.mongodb.net/dearzindagi?retryWrites=true&w=majority',{newUrlParser:true, useUnifiedTopology:true});
const db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
	console.log('"dearzindagi" database successfully connected to the backend server!');
});

/-------------------------DATABASE FUNCTIONALITIES-----------------------/

const submitstoryschema= new mongoose.Schema({
	name:String,
	emailid:String,
	age:Number,
	city:String,
	title:String,
	fullstory:String
});

const submitstorymodel=mongoose.model('story',submitstoryschema);

var story=new submitstorymodel;
var storyposts;
/*var storyposts= [{
	name:'Sheetal Pahadi',
	emailid:'sheetal992009@gmail.com',
	age:'21',
	city:'Bilaspur',
	title:'Hello World!',
	fullstory:'Hi How are you?'
},
{
	name:'Sheetal Pahadi',
	emailid:'sheetal992009@gmail.com',
	age:'21',
	city:'Bilaspur',
	title:'Hello World!',
	fullstory:'Hi How are you?'
},
{
	name:'Sheetal Pahadi',
	emailid:'sheetal992009@gmail.com',
	age:'21',
	city:'Bilaspur',
	title:'Hello World!',
	fullstory:'Hi How are you?'
},
{
	name:'Sheetal Pahadi',
	emailid:'sheetal992009@gmail.com',
	age:'21',
	city:'Bilaspur',
	title:'Hello World!',
	fullstory:'Hi How are you?'
}

];*/



/------------------ROUTING PAGES-----------------------------------/

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/public',express.static('public'));

app.get('/',function(req,res){
	res.render('index');
});

app.get('/articles',function(req,res){
	res.render('articles');
});

app.get('/articles/anxiety',function(req,res){
	res.render('anxiety');
});

app.get('/articles/anxietyquiz',function(req,res){
	res.render('anxietyquiz');
});

app.get('/articles/depression',function(req,res){
	res.render('depression');
});

app.get('/articles/depressionquiz',function(req,res){
	res.render('depressionquiz');
});

app.get('/articles/ocd',function(req,res){
	res.render('ocd');
});

app.get('/articles/ocdquiz',function(req,res){
	res.render('ocdquiz');
});


app.get('/stories',function(req,res){
	res.render('stories');	
});

app.get('/counselor',function(req,res){
	res.render('counselor');	
});

app.get('/faq',function(req,res){
	res.render('faq');	
});


app.get('/stories/submitstory',function(req,res){
	res.render('submitstory');
});



app.get('/stories/readstory',function(req,res){

	submitstorymodel.find({},function(err,result){
		console.log('Showing result');
		console.log(result);
		storyposts=result;
		console.log('Showing storyposts variable');
		console.log(storyposts);
		res.render('readstory',{storyposts:storyposts});
	});
		

});


app.post('/stories/submitstory_yes',function(req,res){
	console.log(req.body);
	story.name=req.body.name;
	story.emailid=req.body.emailid;
	story.age=req.body.age;
	story.city=req.body.city;
	story.title=req.body.title;
	story.fullstory=req.body.fullstory;

	story.save().then(function(){
		console.log('saved');
		submitstorymodel.find({},function(err,result){
		res.render('readstory',{storyposts:result});
		});
	});	
});




app.listen(8080,'127.0.0.1',()=>{
	console.log('Server running at 127.0.0.1:8080');
});