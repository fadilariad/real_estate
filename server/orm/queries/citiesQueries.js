const Models = require('./models');

class CitiesQueries extends Models{
    findAll(){
        return this.models.cities.findAll();
    }
}

module.exports = new CitiesQueries();