const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;

class Roles extends Model{}

Roles.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    type: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
    }
},{
    sequelize,
    freezeTableName: true,
    modelName: 'roles',
    timestamps:false
});

module.exports = Roles;