const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;
class ApartmentsHistory extends Model{}

ApartmentsHistory.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    apartment_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    label: {
        type: Sequelize.ENUM('pending', 'approved', 'denied', 'removed'),
        allowNull: false
    },
    description : {
        type : Sequelize.STRING(500),

    },
    date: {
        type:Sequelize.DATE,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'apartments_history',
    timestamps:false
});

module.exports = ApartmentsHistory;
