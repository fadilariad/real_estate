const CitiesService = require('../service/cities');
class CitiesController {
    init(app) {
        app.get('/cities', this.findAll);
    }
    findAll(req, res) {
        CitiesService.findAll().then(result =>
            res.send(result)
        );
    }


}

module.exports = new CitiesController();