const {Sequelize, DataTypes} = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(`postgres://postgres:root@localhost:5432/postgres`, {dialect: "postgres"})

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.users = require('./userModel') (sequelize, DataTypes)
db.events =require('./eventModel')(sequelize, DataTypes)
db.invites =require('./inviteModel')(sequelize, DataTypes)

// user and event join
db.users.hasMany(db.events);
db.events.belongsTo(db.users);

db.events.hasMany(db.invites);
db.invites.belongsTo(db.events);

db.users.hasMany(db.invites);
db.invites.belongsTo(db.users);

//exporting the module
module.exports = db