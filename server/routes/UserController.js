const UserService = require('../service/users');

class UserController {
    init(app) {
        app.post('/users/login', this.login);
        app.get('/users/validate/:id', this.isUserAuth, this.validateUser);
        app.get('/users/:id/apartments', this.isUserAuth, this.userApartments);
        app.delete('/users/log-out', this.logOut);

    }
    async login(req, res) {
        try {
            const {email, pass} = req.body;
            const {success, cookie, user} = await UserService.logIn(email, pass);
            if (success === true) {
                res.cookie('user', cookie, {httpOnly: true}).status(200).send(user);
            } else {
                res.status(401).send('not match');
            }
        } catch (e) {
            res.send(e);
        }
    }
    async validateUser(req, res) {
        res.send(true);
    }
    userApartments(req, res) {
        const userId = +req.params.id;
        UserService.userApartments(userId).then(result => {
            res.send(result)
        })

    }
    logOut(req, res) {
        res.clearCookie('user').send(true);
    }
    isUserAuth(req, res, next) {
        const userId = +req.params.id;
        const cookie = req.cookies['user'];
        UserService.validateUserWithCookie(userId, cookie)
            .then(result => {
                if (!result) {
                    res.status(401).json('inValid');
                } else {
                    next();
                }
            })
    }
}
module.exports = new UserController();