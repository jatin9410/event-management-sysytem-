const db = require("../Models");

const Invite=db.invites;
const Event=db.events;
const User=db.users;

const inviteCreate= async(req,res)=>{
    try{
    const {eventname,email,eventId} =req.body;
    const t= await User.findOne({
        where:{
            email:email
        }
    })
    const a= await Event.findOne({
        where:{
            eventname:eventname
        }
    })
    // const eventId=a.id;
    const userId=t.id;
    const data ={
        eventId,
        userId
    };
   const event= await Invite.create(data);
   return res.status(200).send(data);
} catch(error){
    
    console.log(error);
    return res.status(409).send("Details are not correct");
}
   
}

module.exports = {
    inviteCreate
};
