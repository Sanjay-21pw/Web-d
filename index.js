const express = require("express")
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const app=express()

const mysql=require('mysql2')

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended:true
}))



var val=[];

const con=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'sanjaysanthosh@2003',
  database:'logfiles'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get("/",(req,res)=>{
  console.log("This is home");
  res.set({
    "Allow-access-Allow-Origin":'*'
  })
  return res.redirect('home.html');
})
app.post("/signup-page",function(req,res){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '21pw29@psgtech.ac.in',
      pass: 'sanjaysanthosh@2003'
    }
  });
  con.connect(function(err){
    let uname=req.body.uname
    let password=req.body.password
    let phone=req.body.phone
    let email=req.body.email
    let user_otp=req.body.otp


    if(err) throw err;
    console.log("Connected to insert!");
    const otp=generateOTP();
    sendOTPtoEmail(email,otp);
    console.log(otp,user_otp);
    // var sql1="INSERT INTO signup values('"+uname+"','"+password+"',"+phone+",'"+email+"')";
    var sql1="INSERT INTO signup values('"+uname+"','"+password+"','"+phone+"','"+email+"','"+otp+"')";
    val.push(uname);
    console.log(sql1)

    con.query(sql1,function(err,result){
      if(err) {throw err;}
      if(user_otp!=otp){
        console.log('Error on otp');
      }

      console.log("Inserted!");
      con.end();
    });
  });
  console.log('inside signup')
  console.log('Successfully submitted!')

  
  // function to generate OTP
  function generateOTP() {
    return randomstring.generate({
      length: 6,
      charset: 'numeric'
    });
  }
  
  // function to send OTP to user's email
  function sendOTPtoEmail(email, otp) {
    const mailOptions = {
      from: '11207sanjayshrinivas@gmail.com',
      to: email,
      subject: 'One Time Password (OTP) for Signup',
      text: `Your OTP is ${otp}. Please enter this code to complete your signup process.`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred while sending email: ', error);
      } else {
        console.log('OTP sent to email successfully: ', info.response);
      }
    });
  }
  
  const otp = generateOTP();

  return res.redirect("home.html")
});

app.post("/login-page",function(req,res){
  con.connect(function(err){
        let uname=req.body.uname;
        let password=req.body.password;
        if(err) throw err;
        var sql2="INSERT INTO login values('"+uname+"','"+password+"')";
        console.log(sql2);
        con.query(sql2,function(err,result){
          if (err) throw err;
          console.log('Connected at login module.');
          if(val.indexOf(uname)==-1){
            console.log("No account found  for the username ;");
          }
          con.end();
        });
  });
  console.log('inside login')
  return res.redirect('home.html');
});

app.post("/sorry",function(req,res){
  con.connect(function(err){
    console.log('Inside sorry-html page');
    return res.redirect('home.html');
  })
})
app.listen(3000,(req,res)=>{
    console.log('listening at 3000 port');
})

// newUser.otp = otp; // assuming User model has an 'otp' field
// newUser.save((err, user) => {
//   if (err) {
//     console.log('Error occurred while saving user: ', err);
//   } else {
//     sendOTPtoEmail(user.email, otp);
//   }

//-----------
// var xoauth2 = require('xoauth2');


// var  smtpTransport=nodemailer.createTransport("SMTP",{
//   service:"Gmail",
//   auth:{
//     user:"11207sanjayshrinivas@gmail.com",
//     pass:"gayushrini2003"
//   }
// });

// var rand,mailOptions,host,link;

// // app.get('/',function(req,res){
// //   res.sendFile('home.html');
// // });

// // app.get('/signup-page',function(req,res){
// //   rand=Math.floor((Math.random() * 100) + 54);
// //   host=req.get('host');
// //   link="http://"+req.get('host')+"/verify?id="+rand;
// //   mailOptions={
// //       to : req.query.to,
// //       subject : "Please confirm your Email account",
// //       html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
// //   }
// //   console.log(mailOptions);
// //   smtpTransport.sendMail(mailOptions, function(error, response){
// //    if(error){
// //           console.log(error);
// //       res.end("error");
// //    }else{
// //           console.log("Message sent: " + response.message);
// //       res.end("sent");
// //        }
// // });
// // });

// // app.get('/verify',function(req,res){
// //   console.log(req.protocol+":/"+req.get('host'));
// //   if((req.protocol+"://"+req.get('host'))==("http://"+host))
// // {
// //     console.log("Domain is matched. Information is from Authentic email");
// //     if(req.query.id==rand)
// //     {
// //         console.log("email is verified");
// //         res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
// //     }
// //     else
// //     {
// //         console.log("email is not verified");
// //         res.end("<h1>Bad Request</h1>");
// //     }
// // }
// // else
// // {
// //     res.end("<h1>Request is from unknown source");
// // }
// // });

// /*--------------------Routing Over----------------------------*/

// const verificationCode = crypto.randomBytes(20).toString('hex');

// // Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: '11207sanjayshrinivas@gmail.com',
//     pass: 'gayushrini2003'
//   }
// });

// // Create an email with the verification code
// const mailOptions = {
//   from: '11207sanjayshrinivas@gmail.com',
//   to: 'recipient_email@example.com',
//   subject: 'Please verify your email',
//   html: `Hello,<br><br>Thank you for signing up! Please use the following verification code to verify your email:<br><br><strong>${verificationCode}</strong><br><br>Best regards,<br>The Example Team`
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


// app.get("/",function(req,res){
//   res.sendFile(__dirname+'/index.html');
// })

// app.get("/signup-page",function(req,res){
//   console.log('hello');
//   res.render('signup-page');
// });



//  con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql0 = "SELECT * FROM signin";
//   con.query(sql0, function (err, result) {
//      if (err) throw err;
//      console.log(result);
//      res.render('results', { results: result });
//      con.end()
//   });

// });

// });

// app.post("/",function(req,res){
//   let uname=req.body.name;
//   let password=req.body.password;
//   let phone=req.body.phone;
//   let email=req.body.email;
//   console.log(uname);
//   console.log(password);
//   console.log(phone);
//   console.log(email);

//   let con=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'sanjaysanthosh@2003',
//     database:'logfiles'
//   })
//   con.connect(function(err){
//     if(err) throw err;
//     console.log("Connected to insert!");
//     var sql1="INSERT INTO signin values('"+uname+"',"+password+",'"+phone+",'"+email+"')";
//     con.query(sql1,function(err,result){
//       if(err) throw err;
//       console.log("Inserted!");
//       con.end();
//     });
//   });
//     res.redirect("http://localhost:3000/");
// });

