const MainService = require('./index');
class ApartmentsService extends MainService{
    saleStatusValues() {
        return this.queries.apartments.saleValues();
    }

    typeEnumValues() {
        return this.queries.apartments.typeValues();
    }

    async statistics() {
        try {
            const { rent, sale, house, condo } = await this.queries.apartments.statics();
            return { rent: rent.length, sale: sale.length, house: house.length, condo: condo.length };

        } catch (e) {
            console.log(e);
            return e;
        }

    }
    findById(id) {
        return this.queries.apartments.findOne(id);
    }
    findAll(skip, query) {
        const {offset,conditions} = this.buildSearch(skip,query);
        const result = this.queries.apartments.findAllSkipLimit(offset,conditions);
        return result;
    }
}

module.exports = new ApartmentsService();