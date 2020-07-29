const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;
class Users extends Model{}

Users.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps:false
});
module.exports = Users;