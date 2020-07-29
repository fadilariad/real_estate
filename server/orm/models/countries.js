const { Sequelize, sequelize } = require('../config/config');
const Model = Sequelize.Model;
const Cities = require('./cities');
class Countries extends Model {}

Countries.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'countries',
    timestamps: false
});

module.exports = Countries;