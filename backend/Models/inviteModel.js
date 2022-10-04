module.exports = (sequelize, DataTypes) => {
    const Invite = sequelize.define( "invites", {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Invite
 }