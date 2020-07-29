const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;

class Permissions extends Model{}

Permissions.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
},{
    sequelize,
    freezeTableName: true,
    modelName: 'permissions',
    timestamps:false
});

module.exports = Permissions;