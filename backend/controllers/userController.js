//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const sendEmail=require("../Middlewares/sendEmail")
const crypto= require("crypto");
const { Op } = require('sequelize');

// Assigning users to the variable User
const User = db.users;
const Event= db.events;
const Invite=db.invites;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
 try {
   const { userName, email, password } = req.body;
   const data = {
     userName,
     email,
     password: await bcrypt.hash(password, 10),
   };
   //saving the user
   const user = await User.create(data);
//    console.log(process.env.secretKey);
   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id }, "jatin", {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user));
     console.log(token);
     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};


//login authentication

const login = async (req, res) => {
 try {
const { email, password } = req.body;

console.log(email);
   //find a user by their email
   const user = await User.findOne({
    where: {
      email: email,
    }
    });
    console.log(user);

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);
 
     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       //send user data
       return res.status(201).send(user);
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

const logout = async(req,res)=>{

    res.cookie("jwt",null,{
     expires:new Date(Date.now()),
     httpOnly: true
    })
 
     res.status(200).json({
         success: true,
         message: "Logged Out",
     })
  };


  const updatePassword = async(req,res)=>{
    try {
        const { email, password, newpassword } = req.body;
        
        console.log(email);
           //find a user by their email
           const user = await User.findOne({
            where: {
              email: email,
            }
            });
            console.log(user);
        
           //if user email is found, compare password with bcrypt
           if (user) {
             const isSame = await bcrypt.compare(password, user.password);
         
             //if password is the same
              //generate token with the user's id and the secretKey in the env file
        
             if (isSame) {
                const {email, newpassword } = req.body;
   const data = {
     email,
     password: await bcrypt.hash(newpassword, 10),
   };
   //saving the user
   if (password != undefined) {
        User.update({
            email: email,
            password: data.password
        }, { where: {email: email} });
        res.json('User updated successfully');
    }
   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
  
     let token = jwt.sign({ id: user.id }, "jatin", {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user));
     //send users details
     return res.status(201).send(token);
  }
}else {
    return res.status(401).send("User doesn't exist");
  }
} catch (error) {
  console.log(error);
}
};

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ where:{
        email: req.body.email }});
  
    if (!user) {
        return res.status(401).send("User doesn't exist");
    }
  
    // Get ResetPassword Token
   

        // Generating token
        const resetToken = crypto.randomBytes(20).toString("hex");
    
        // Hashing and adding resetPassword to userSchema
        resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
        resetPasswordExpire = Date.now() +15*60*1000;

  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
   
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: ` Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
        console.log(error)
      await user.save({ validateBeforeSave: false });
  
      return res.status(500).send("error");
    }
  };

  const eventinvitation = async(req,res)=>{
    try{
        console.log(req.body);
    const {email,page,startdate,enddate} =req.body;
    const {eventId} = req.body;
    // const user= await User.findOne({
    //     where:{
    //         email:email
    //     },
    //     attributes:[email],
        //pagination
        // offset:10*page,
        // limit:10,
        // include:{
        //     model: Event,
        //     attributes:['eventname','eventdesc'],
        //     order: [
        //       ['eventname', 'ASC']
        //   ]
        // }
    // })
    // console.log(user);
    // console.log(eventId)
    // if(eventId){
    //   const result = await Event.findOne({
    //     where:{
    //       eventId:eventId
    //     }
    //   })
    // }
    // return res.status(200).send(result);
    console.log(startdate)
    const a="2022-10-04 00:00:00";
    console.log( a)
    const startDate = new Date(startdate);
const endDate = new Date(enddate);
    const EventList= await Event.findAll({
      where:{
          email:email,
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
      },
      // Sorting
      order: [
        ['eventname', 'ASC']
    ],
      // pagination
      offset:10*page,
      limit:10,
      attributes:['eventdesc',"eventname"],
  })


    console.log("================== User with events created")
    // console.log(user);


    const invited= await Invite.findAll({
        where:{
            email:email,
        }
    })

    inv = [];

    for (let index = 0; index < invited.length; index++) {
        const invitedEvents= await Event.findOne({
            where:{
                id:invited[index].eventId,
            },
            // pagination
            offset:10*page,
            limit:10,
            attributes:['eventdesc',"eventname"],
        })
    
        console.log(invitedEvents)
    
        inv.push(invitedEvents);
    }

    console.log("================== Invited Events")
    console.log(inv);

    return res.status(200).json({
         EventList:EventList,
         invitations:inv,
         page
    })
  } catch(error){
    console.log(error);

    return res.status(500).send(error);
  }
}
  
const eventDetails=  async(req,res)=>{
  try{
    console.log(req.body);
const {eventName} =req.body;
const event= await Event.findAll({
  where:{
      eventname:eventName,
  },
  attributes:['id','eventname','eventdesc',['email','created by']]
})

 let invitations=[];
 for (let index = 0; index < event.length; index++) {
  const invited= await Invite.findAll({
      where:{
          eventId:event[index].id,
      },
      // pagination
      offset:10,
      limit:10,
      attributes:["email"],
  })

  console.log(invited)

  invitations.push(invited);
  return res.status(200).json({
    Eventdetails:event,
    invitations
})
}

}catch(error){
  console.log(error);

    return res.status(500).send(error);
}
}

const eventupdate= async(req,res)=>{
  try{
  const {oldeventname,neweventname,eventdesc} =req.body;
  const event= await Event.findOne({
    where:{
        eventname:oldeventname,
    },
  })
  console.log(event)
  event.eventname=neweventname;
  event.eventdesc=eventdesc;
  event.save();
  return res.status(200).send(event);
}catch(error){
  return res.status(500).send(error);
}
}

module.exports = {
 signup,
 login,
 logout,
 updatePassword,
 forgotPassword,
 eventinvitation,
 eventDetails,
 eventupdate
};