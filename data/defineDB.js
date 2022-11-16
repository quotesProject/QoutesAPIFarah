const {Sequelize, DataTypes} = require("sequelize"); 
const db = new Sequelize({
    dialect: "sqlite", 
    logging: false, 
    storage: "../data/data.sqlite"
})
const Quote = db.define("quote", {
    text : { 
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    author: {
        type: DataTypes.STRING
    }
})

module.exports= {Quote, db}