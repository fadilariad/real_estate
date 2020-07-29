const MainService = require('./index');

class CitiesService extends MainService{
    findAll(){
        return this.queries.cities.findAll()
    }
}


module.exports = new CitiesService();