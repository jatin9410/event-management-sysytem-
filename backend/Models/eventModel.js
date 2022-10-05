module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define( "events", {
        eventname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventdesc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {timestamps: true}, )
    return Event
 }