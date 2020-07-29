const { Sequelize, sequelize } = require('../config/config');
const Model = Sequelize.Model;
const Countries = require('./countries');
class Cities extends Model {}

Cities.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    hebrew_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    english_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Countries,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'cities',
    timestamps: false
});

module.exports = Cities;