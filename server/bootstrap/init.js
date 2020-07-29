function auth(app){
    app.all('*',(req, res, next) => {
        next();
    });
}

module.exports = function(app, express, bodyParser, cookie) {
    app.use(express.json());
    app.use(express.static('./www'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookie());

    app.use(function (err, req, res, next) {
        if (!err) return next();
        res.status(500).send(err);
    });
    auth(app);
};