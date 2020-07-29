const MainService = require('./index');


class UsersService extends MainService{
    async logIn(email, password) {
        try {
            const hashedPass = this.crypt.x2(password);
            const { count, rows } = await this.queries.users.validateUser(email, hashedPass);
            if (count === 0) {
                return { success: false, rows };
            } else {
                const hashedCookie = this.cryptPass(rows[0]);
                const { id, first_name: name } = rows[0];
                return { success: true, cookie: hashedCookie, user: { id, name } };

            }
        } catch (e) {
            return e;
        }
    }

    async validateUserWithCookie(id, cookie) {
        try {
            const user = await this.queries.users.findUseById(id);
            if (user) {
                const hashedUser = this.cryptPass(user);;
                if (hashedUser === cookie) {
                    return true;
                } else {
                    return false
                }
            } else {
                return false
            }

        } catch (e) {
            console.log(e);
        }
    }

    async userApartments(userId) {
        try {
                return await this.queries.apartments.apartmentsByUserId(userId);
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = new UsersService();