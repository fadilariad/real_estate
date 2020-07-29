const OrmAbstract = require('./models');

class ApartmentsQueries extends OrmAbstract{
    constructor() {
        super();
        this.include= [
            { model: this.models.images, attributes: ['url'] },
            // {
            //     model: this.models.cities,
            //     attributes: [
            //         ['hebrew_name', 'he'],
            //         ['english_name', 'en']
            //     ]
            // },
            // { model: this.models.users, attributes: ['last_name', 'first_name', 'email', 'phone'] },
        ];
    }
    findAllSkipLimit(skip,query){
        return this.models.apartments.findAll({
            distinct: 'id',
            where: {
                [this.Op.and]: [query]
            },
            include: this.include
        })

    }
    findOne(id) {
        return this.models.apartments.findByPk(id, {
            include: this.include
        });
    }
    saleValues() {
        return this.models.apartments.rawAttributes.sale_status.values;
    }
    typeValues() {
        return this.models.apartments.rawAttributes.property_type.values;
    }

    apartmentsByUserId(id) {
        return this.models.apartments.findAll({
            where: {
                user_id: id
            },
            include:this.include
        })
    }

    async statics() {
        try {
            const rent = await this.models.apartments.findAll({
                distinct: 'id',
                where: {
                    sale_status: {
                        [this.Op.or]: ['rent', 'both']
                    }
                }
            });
            const sale = await this.models.apartments.findAll({
                distinct: 'id',
                where: {
                    sale_status: {
                        [this.Op.or]: ['sell', 'both']
                    }
                }
            });
            const house = await this.models.apartments.findAll({
                distinct: 'id',
                where: {
                    property_type: 'house'
                }
            });
            const condo = await this.models.apartments.findAll({
                distinct: 'id',
                where: {
                    property_type: 'condo'
                }
            });
            return { rent, sale, house, condo };
        } catch (e) {
            return e;
        }

    }


}
module.exports = new ApartmentsQueries();