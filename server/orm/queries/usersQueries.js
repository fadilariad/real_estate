const Models = require('./models');

class UserQueries extends Models{

    async validateUser(email, pass) {
        const { count, rows } = await this.models.users.findAndCountAll({
            where: {
                [this.Op.and]: [{ email: email }, { password: pass }]
            }
        });
        return { count, rows };
    }

    async  findUseById(id) {
        const res = await this.models.users.findByPk(id);
        return res;
    }
}


module.exports = new UserQueries();