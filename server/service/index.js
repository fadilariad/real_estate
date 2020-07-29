class MainService {
    constructor() {
        this.queries = {
            apartments: require('../orm/queries/apartmentsQeuries'),
            cities: require('../orm/queries/citiesQueries'),
            users: require('../orm/queries/usersQueries')
        };
        this.op = require('sequelize').Op;
        this.secret = require('./secret');
        this.crypt = require('sha256');
    }
    cryptPass(user){
        return this.crypt(user.id + user.email + this.secret);
    }
    buildSearch(skip,query){
        let offset = parseInt(skip) - 1;
        if (offset <= 0) {
            offset = 0;
        }
        offset = offset * 8;
        const conditions = [{ status: 'approved' }, { availability: 'available' }];
        if (query.city) {
            conditions.push({ city_id: +query.city })
        }
        if (query.minPrice) {
            conditions.push({
                price: {
                    [this.op.gte]: +query.minPrice
                }
            })
        }
        if (query.maxPrice) {
            conditions.push({
                price: {
                    [this.op.lte]: +query.maxPrice
                }
            })
        }
        if (query.numRoom) {
            conditions.push({
                number_of_room: {
                    [this.op.gte]: +query.numRoom
                }
            })
        }
        if (query.numBath) {
            conditions.push({
                number_of_bath: {
                    [this.op.gte]: +query.numBath
                }
            })
        }
        if (query.status && query.status != 'both') {
            conditions.push({
                sale_status: {
                    [this.op.or]: [query.status, 'both']
                }
            });
        }
        if (query.type) {
            conditions.push({
                property_type: query.type
            });
        }
        if (query.sqft) {
            conditions.push({
                sqft: {
                    [this.op.gte]: +query.sqft
                }
            });
        }

        return {offset,conditions};
    }
}

module.exports = MainService;