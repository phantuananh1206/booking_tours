const homeRouter = require('./home');
const userRouter = require('./users');

function route(app) {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
}

module.exports = route;
