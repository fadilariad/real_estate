const ApartmentsService = require('../service/apartments');
class ApartmentsController {
    init(app) {
        app.get('/apartments/statistics', this.statistics);
        app.get('/apartments/sale', this.saleStatus);
        app.get('/apartments/type', this.typeValues);
        app.get('/apartments/page/:skip', this.findAll);
        app.get('/apartments/:id', this.findOne);

    }
    findAll(req, res) {
        const offset = req.params.skip;
        const { query } = req;
        ApartmentsService.findAll(parseInt(offset), query).then(result =>
            res.send(result)
        );
    }
    findOne(req, res) {
        const id = req.params.id;
        ApartmentsService.findById(id).then(result => res.send(result));
    }
    saleStatus(req, res) {
        const result = ApartmentsService.saleStatusValues();
        res.send(result);
    }
    typeValues(req, res) {
        const result = ApartmentsService.typeEnumValues();
        res.send(result);
    }
    statistics(req, res) {
        ApartmentsService.statistics().then(result => {
            res.send(result);
        })

    }
}

module.exports = new ApartmentsController();