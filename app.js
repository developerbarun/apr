//Requiring express

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();


//Requiring path it will be used for __dirname to specify paths
const path = require('path');


//this is to catch form name by req.body works as bodyParser
const { urlencoded } = require('express');
const { json } = require('express');
//port number 
const port = process.env.PORT || 3000

//using req.body
app.use(express.json());
app.use(express.urlencoded({extended : false}))

//getting path of html file
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));

mongoose.connect("mongodb://localhost:27017/apr");

const aprData = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required  : true 
    },
    branch : {
        type : String,
        required : true
    },
    totalMarks : {
        type : String,
        required : true
    },
    percentage : {
        type : String,
        required : true
    },
    grade : {
        type : String,
        required : true
    }
});

const models = mongoose.model("apr",aprData);


//getting our html file
app.get("/",(req,res) =>{
    
    res.sendFile(path.join(__dirname,"/public/index.html"));
})

//posting our data to our database
app.post("/", (req,res) => {

    const name = req.body.name;
    const course = req.body.course;
    const branch = req.body.branch;
    const totalMarks = req.body.marks;
    
    const item = new item({
        name : name,
        course : course,
        branch : branch,
        totalMarks : totalMarks
    });

    item.save();
    res.redirect("/")
})


//listening our port
app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})
