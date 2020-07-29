const { Sequelize, sequelize } = require('../config/config');
const Model = Sequelize.Model;
const Users = require('./users');
const Cities = require('./cities');
const Images = require('./images');
class Apartments extends Model {}

Apartments.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
    },
    city_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Cities,
            key: 'id'
        },
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    number_of_room: {
        type: Sequelize.INTEGER
    },
    number_of_bath: {
        type: Sequelize.INTEGER
    },
    sqft: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false

    },
    description: {
        type: Sequelize.STRING(500),

    },
    sale_status: {
        type: Sequelize.ENUM,
        values: ['sale', 'rent', 'both'],
        allowNull: false
    },
    availability: {
        type: Sequelize.ENUM('available', 'suspended', 'removed'),
        allowNull: false
    },
    property_type: {
        type: Sequelize.ENUM('house', 'ranch', 'condo', 'land'),
        allowNull: false
    },
    main_image: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM('pending', 'approved', 'denied', 'removed'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'apartments',
    timestamps: false
});

Apartments.belongsTo(Cities, { foreignKey: 'city_id' });
Apartments.belongsTo(Users, { foreignKey: 'user_id' });
Apartments.hasMany(Images, { foreignKey: 'apartment_id' });
module.exports = Apartments;