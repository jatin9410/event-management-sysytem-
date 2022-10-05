module.exports = (sequelize, DataTypes) => {
    const Invite = sequelize.define( "invites", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Invite
 }