const fs = require('fs');

module.exports = function(app) {
    const files = fs.readdirSync(__dirname);
    files.forEach(file => {
        if(file != 'index.js') {
            const controller = require('./' + file);
            controller.init(app);
        }

    });
};