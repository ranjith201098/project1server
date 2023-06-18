const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
/* const { collection } = require("./models/dataSchema"); */
/* const router = express.Router(); */
const nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.json()); 
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true }).then(()=>{
  console.log('connected')
}).catch(()=>{
  console.log('datbase error ')
})

    //nodemailer configuration..................
        




const ReactFormDataSchema = new mongoose.Schema({
      name: {
          type: String,
          
      },
      role: {
          type: String,
          
      },
  dob:{
    type:Date,


  },
  address:{
    type:String,


  },
  email:{
     type:String,


  }
  });
  
  const User = mongoose.model('User', ReactFormDataSchema);


app.post('/insert', async(req, res) => {
      const FirstName = req.body. fullName;
      const CompanyRole = req.body.companyRole
      const Dob = req.body. studentDob
      const Address= req.body.studentAddress
      const Email = req.body.studentEmail
  
      const formData = new User({
       name: FirstName,
           role: CompanyRole,                        
       dob: Dob,
       address:Address,
       email:Email
        /*  fullName: name,
                   companyRole:role,
                  studentDob:dob,
                  studentAddress:address,
                  studentEmail:email */
       
 });
  
      try {
          await formData.save();
          res.send("submitted")
      } catch(err) {
          console.log(err)
      }
  });
  

  
  app.get('/', function (req, res) {
    res.send('home');
}); 




app.get('/api/books', (req, res) => {
  User.find().then((data) => {
  res.send(data);
      })
    });
    
    app.delete("/api/delete/:id", async (req, res) => {
     /*  var myId = JSON.parse(); */
      try {
        const articles = await User.findByIdAndDelete({'_id':(req.params.id)});
       
        res.send("Deleted");
      } catch (err) {
        console.log(err);
      }
    });

    app.get("/api/edit/:id",async(req,res)=>{
      
      try{
        const data = await User.findById({'_id':(req.params.id)},({}));
        res.send(data);
     
      }catch(err)
      {
        console.log(err);
      }
    });
           

  
            //nodemailer  send email
      
    
    const transporter = nodemailer.createTransport({
      
     
      port: 465,              // true for 465, false for other ports
      service:"Gmail",
         auth: {
              user: 'ranjithsurendar8@gmail.com',
              pass: 'yukqymiinxjryxto',
           },
      secure: true,
      });


          app.post('/email_Post',(req,res)=>{
                  
            const _email = req.body. Email;
            const _subject = req.body.Subject
             const _description = req.body. Description

  const mailData = {
    from:'ranjithsurendar8@gmail.com',  // sender address
      to: _email,   // list of receivers
      subject: _subject,
      text: _description
      
    };
    transporter.sendMail(mailData, function (err, info) {
      if(err){
        res.send('massage not send')
        console.log(err)
      }
        else{
          res.send("Gmail sucessfully send")
        console.log("Message sent: %s", info.messageId);
        }
     /*  else
        res.send('succesfully send')
        console.log(info) */
   });
            
          })
          //student data fetching
          app.get("/student/data",async(req,res)=>{
           const search = req.query.name;
           console.log(search)
            try{
              const data = await User.find({name:search})
              res.send(data);                                                           // 'name':'ranjithkumar'
              console.log(data);
            }catch(err)
            {
              console.log(err);
              res.send('no student available')
            }
          });
  /*   MyClass.findById(req.params.id/) */
    /*  app.delete('/api/delete/:id', function(req, res){
      User.findByIdAndDelete({_id: req.params.id}, 
         function(err, User){
      if(err) res.json(err);
      else    res.redirect('/');
      });
      }); */
      app.post('/update/api/:id', async(req, res) => {
            
        
            
            const _FirstName = req.body. _fullName;
            const _CompanyRole = req.body._companyRole
            const _Dob = req.body. _studentDob
            const _Address= req.body._studentAddress
            const _Email = req.body._studentEmail
        
            const _formData = new User({
             name: _FirstName,
                 role: _CompanyRole,                        
             dob: _Dob,
             address:_Address,
             email:_Email
              
       });
      console.log(req.params.id)
      console.log(_formData)
            const query = {'_id':req.params.id}
        
            try {
     const mens = await   User.findOneAndUpdate({query},{_formData},{upsert:true})
          
              res.send('Thing updated successfully!');
               console.log(mens)
            
          
            } catch(err) {
                console.log(err)
            }
        });
         
  const port = process.env.PORT || 4000;
  
  app.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });