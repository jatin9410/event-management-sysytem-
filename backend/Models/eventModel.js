module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define( "events", {
        EventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventdesc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Event
 }