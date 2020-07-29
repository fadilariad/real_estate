
class OrmModels {
    constructor() {
        this.models = {
            apartments:require('../models/apartments'),
            users:require('../models/users'),
            cities:require('../models/cities'),
            roles:require('../models/roles'),
            wishList:require('../models/wishList'),
            rolePermissions:require('../models/rolesPermissions'),
            images:require('../models/images'),
            apartmentHistory:require('../models/apartmentHistory'),
            permissions:require('../models/permissions'),
            countries:require('../models/countries'),
            forgotPass:require('../models/forgotPass')

        };
        this.Op = require('sequelize').Op;
    }
}

module.exports = OrmModels;