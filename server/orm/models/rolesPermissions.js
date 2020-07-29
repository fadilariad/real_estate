const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;

class RolesPermissions extends Model{}

RolesPermissions.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    permission_id: {
        type:Sequelize.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    freezeTableName: true,
    modelName: 'roles_permissions',
    timestamps:false
});

module.exports = RolesPermissions;