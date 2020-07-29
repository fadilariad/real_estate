const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;

class ForgotPass extends Model{}

ForgotPass.init({
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    token: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull:false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{
    sequelize,
    freezeTableName: true,
    modelName: 'forgot_password',
    timestamps:false
});

module.exports = ForgotPass;