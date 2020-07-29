const {Sequelize,sequelize} = require('../config/config');
const Model = Sequelize.Model;
class WishList extends Model{}

WishList.init({
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
        allowNull:false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'wish_list',
    timestamps:false
});
module.exports = WishList;