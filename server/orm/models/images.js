const { Sequelize, sequelize } = require('../config/config');
const Apartments = require('./apartments');
const Model = Sequelize.Model;

class Images extends Model {}

Images.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    apartment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Apartments,
            key: 'id'
        }
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'images',
    timestamps: false
});

// Images.belongsTo(Apartments, { foreignKey: 'apartment_id' });

module.exports = Images;