const db = require("../Models");

const Event=db.events;
const User=db.users;

const eventCreate= async(req,res)=>{
    try{
        console.log(req.body);
    const {eventdesc,eventname,email} =req.body;
    const t= await User.findOne({
        where:{
            email:email
        }
    })
    const userId=t.id;
    const data ={
        eventname,
        eventdesc,
        email,
        userId
    };
   const event= await Event.create(data);
   return res.status(200).send(data);
} catch(error){
    
    console.log(error);
    return res.status(409).send("Details are not correct");
}
   
}

module.exports = {
    eventCreate
};